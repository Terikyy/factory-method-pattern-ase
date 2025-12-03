import { DocumentExporter } from '../interfaces';
import { Document, Paragraph, TextRun, HeadingLevel, Packer } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Concrete Product - DOCXExporter
 * 
 * This class represents a concrete implementation of the DocumentExporter interface.
 * In the Factory Method pattern, this is a "Concrete Product".
 * 
 * DOCXExporter converts Markdown to a Word document (.docx) with:
 * - Heading 1 style for #
 * - Heading 2 style for ##
 * - Bold formatting for **text**
 * - Italic formatting for *text*
 * 
 * Uses docx library for proper .docx file generation.
 */
export class DOCXExporter implements DocumentExporter {
    /**
     * Exports markdown content as a Word document (.docx).
     * Converts markdown to formatted Word document structure.
     * 
     * @param content - Markdown formatted text
     */
    async export(content: string): Promise<void> {
        console.log('DOCXExporter: Starting Word document export...');
        
        const paragraphs = this.parseMarkdownToDocx(content);
        
        const doc = new Document({
            sections: [{
                properties: {},
                children: paragraphs,
            }],
        });
        
        const blob = await Packer.toBlob(doc);
        saveAs(blob, 'document.docx');
        
        console.log('DOCXExporter: Export completed successfully');
    }

    /**
     * Parses markdown content into docx Paragraph elements.
     * 
     * @param content - Markdown formatted text
     * @returns Array of docx Paragraph objects
     */
    private parseMarkdownToDocx(content: string): Paragraph[] {
        const lines = content.split('\n');
        const paragraphs: Paragraph[] = [];
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (!trimmed) {
                // Empty line
                paragraphs.push(new Paragraph({ text: '' }));
            } else if (trimmed.startsWith('# ')) {
                // Heading 1
                const text = trimmed.substring(2);
                paragraphs.push(
                    new Paragraph({
                        text: text,
                        heading: HeadingLevel.HEADING_1,
                    })
                );
            } else if (trimmed.startsWith('## ')) {
                // Heading 2
                const text = trimmed.substring(3);
                paragraphs.push(
                    new Paragraph({
                        text: text,
                        heading: HeadingLevel.HEADING_2,
                    })
                );
            } else {
                // Regular paragraph with inline formatting
                const textRuns = this.parseInlineFormatting(trimmed);
                paragraphs.push(new Paragraph({ children: textRuns }));
            }
        });
        
        return paragraphs;
    }

    /**
     * Parses inline formatting (bold and italic) into TextRun objects.
     * 
     * @param text - Text with potential **bold** or *italic* markers
     * @returns Array of TextRun objects with appropriate formatting
     */
    private parseInlineFormatting(text: string): TextRun[] {
        const runs: TextRun[] = [];
        let remaining = text;
        
        while (remaining.length > 0) {
            // Look for bold (**text**) - must check this first!
            const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
            // Look for italic (*text*) but not bold - negative lookbehind/lookahead
            const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
            
            let nextMatch = null;
            let isBold = false;
            
            if (boldMatch && (!italicMatch || boldMatch.index! <= italicMatch.index!)) {
                nextMatch = boldMatch;
                isBold = true;
            } else if (italicMatch) {
                nextMatch = italicMatch;
                isBold = false;
            }
            
            if (nextMatch && nextMatch.index !== undefined && nextMatch[1]) {
                // Add text before the match
                if (nextMatch.index > 0) {
                    runs.push(new TextRun({ text: remaining.substring(0, nextMatch.index) }));
                }
                
                // Add formatted text
                if (isBold) {
                    runs.push(new TextRun({ text: nextMatch[1]!, bold: true }));
                } else {
                    runs.push(new TextRun({ text: nextMatch[1]!, italics: true }));
                }
                
                // Continue with remaining text
                remaining = remaining.substring(nextMatch.index + nextMatch[0].length);
            } else {
                // No more formatting
                if (remaining.length > 0) {
                    runs.push(new TextRun({ text: remaining }));
                }
                break;
            }
        }
        
        return runs.length > 0 ? runs : [new TextRun({ text: '' })];
    }
}

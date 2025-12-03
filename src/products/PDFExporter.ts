import { DocumentExporter } from '../interfaces';
import { jsPDF } from 'jspdf';

/**
 * Concrete Product - PDFExporter
 * 
 * This class represents a concrete implementation of the DocumentExporter interface.
 * In the Factory Method pattern, this is a "Concrete Product".
 * 
 * PDFExporter converts Markdown to a styled PDF document with:
 * - Large headings for # (Heading 1)
 * - Medium headings for ## (Heading 2)
 * - Bold text for **text**
 * - Italic text for *text*
 * 
 * Uses jsPDF library for direct PDF generation and download.
 */
export class PDFExporter implements DocumentExporter {
    /**
     * Exports markdown content as a styled PDF document.
     * Converts markdown syntax to formatted text and generates PDF.
     * 
     * @param content - Markdown formatted text
     */
    export(content: string): void {
        console.log('PDFExporter: Starting PDF export...');
        
        const doc = new jsPDF();
        const lines = this.parseMarkdown(content);
        
        let yPosition = 20;
        const lineHeight = 7;
        const pageHeight = doc.internal.pageSize.height;
        
        lines.forEach((line) => {
            // Check if we need a new page
            if (yPosition > pageHeight - 20) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Apply styling based on line type
            if (line.type === 'h1') {
                doc.setFontSize(20);
                doc.setFont('helvetica', 'bold');
                doc.text(line.text, 20, yPosition);
                yPosition += lineHeight * 2;
            } else if (line.type === 'h2') {
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text(line.text, 20, yPosition);
                yPosition += lineHeight * 1.5;
            } else if (line.type === 'paragraph') {
                doc.setFontSize(12);
                
                // Render paragraph with inline formatting
                yPosition = this.renderParagraphWithFormatting(doc, line.text, 20, yPosition, lineHeight);
            } else if (line.type === 'empty') {
                yPosition += lineHeight / 2;
            }
        });
        
        doc.save('document.pdf');
        console.log('PDFExporter: Export completed successfully');
    }

    /**
     * Renders a paragraph with inline bold and italic formatting.
     * 
     * @param doc - jsPDF document instance
     * @param text - Text with markdown formatting
     * @param x - X position
     * @param y - Y position
     * @param lineHeight - Line height for wrapping
     * @returns New Y position after rendering
     */
    private renderParagraphWithFormatting(doc: jsPDF, text: string, x: number, y: number, lineHeight: number): number {
        const segments = this.parseInlineFormatting(text);
        let currentX = x;
        let currentY = y;
        const maxWidth = 170;
        
        segments.forEach(segment => {
            // Set font style based on formatting
            if (segment.bold) {
                doc.setFont('helvetica', 'bold');
            } else if (segment.italic) {
                doc.setFont('helvetica', 'italic');
            } else {
                doc.setFont('helvetica', 'normal');
            }
            
            const words = segment.text.split(' ');
            
            words.forEach((word, index) => {
                const wordWithSpace = index < words.length - 1 ? word + ' ' : word;
                const wordWidth = doc.getTextWidth(wordWithSpace);
                
                // Check if we need to wrap to next line
                if (currentX + wordWidth > x + maxWidth) {
                    currentX = x;
                    currentY += lineHeight;
                }
                
                doc.text(wordWithSpace, currentX, currentY);
                currentX += wordWidth;
            });
        });
        
        return currentY + lineHeight;
    }

    /**
     * Parses inline formatting (bold and italic) from text.
     * 
     * @param text - Text potentially containing **bold** or *italic*
     * @returns Array of text segments with formatting information
     */
    private parseInlineFormatting(text: string): Array<{ text: string; bold?: boolean; italic?: boolean }> {
        const segments: Array<{ text: string; bold?: boolean; italic?: boolean }> = [];
        let remaining = text;
        
        while (remaining.length > 0) {
            // Look for bold (**text**)
            const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
            // Look for italic (*text*) but not bold
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
                    segments.push({ text: remaining.substring(0, nextMatch.index) });
                }
                
                // Add formatted text
                if (isBold) {
                    segments.push({ text: nextMatch[1]!, bold: true });
                } else {
                    segments.push({ text: nextMatch[1]!, italic: true });
                }
                
                // Continue with remaining text
                remaining = remaining.substring(nextMatch.index + nextMatch[0].length);
            } else {
                // No more formatting, add remaining text
                if (remaining.length > 0) {
                    segments.push({ text: remaining });
                }
                break;
            }
        }
        
        return segments;
    }

    /**
     * Parses markdown content into structured lines with types.
     * Preserves inline formatting markers.
     * 
     * @param content - Markdown formatted text
     * @returns Array of parsed lines with type information
     */
    private parseMarkdown(content: string): Array<{ type: string; text: string }> {
        const lines = content.split('\n');
        const parsed: Array<{ type: string; text: string }> = [];
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (!trimmed) {
                parsed.push({ type: 'empty', text: '' });
            } else if (trimmed.startsWith('# ')) {
                const text = trimmed.substring(2);
                // Strip formatting from headings for simplicity
                parsed.push({ type: 'h1', text: text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1') });
            } else if (trimmed.startsWith('## ')) {
                const text = trimmed.substring(3);
                // Strip formatting from headings for simplicity
                parsed.push({ type: 'h2', text: text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1') });
            } else {
                // Keep formatting for paragraphs
                parsed.push({ type: 'paragraph', text: trimmed });
            }
        });
        
        return parsed;
    }
}

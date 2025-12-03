import { DocumentExporter } from '../interfaces';

/**
 * Concrete Product - TXTExporter
 * 
 * This class represents a concrete implementation of the DocumentExporter interface.
 * In the Factory Method pattern, this is a "Concrete Product".
 * 
 * TXTExporter strips all Markdown formatting and exports plain text.
 * It removes:
 * - Heading markers (# and ##)
 * - Bold formatting (**)
 * - Italic formatting (*)
 */
export class TXTExporter implements DocumentExporter {
    /**
     * Exports markdown content as plain text (.txt file).
     * Removes all markdown formatting syntax.
     * 
     * @param content - Markdown formatted text
     */
    export(content: string): void {
        console.log('TXTExporter: Starting plain text export...');
        
        const plainText = this.stripMarkdown(content);
        this.downloadFile(plainText, 'document.txt', 'text/plain');
        
        console.log('TXTExporter: Export completed successfully');
    }

    /**
     * Strips all Markdown formatting from the content.
     * Removes heading markers, bold, and italic syntax.
     * 
     * @param content - Markdown formatted text
     * @returns Plain text without formatting
     */
    private stripMarkdown(content: string): string {
        let text = content;
        
        // Remove heading markers (# and ##)
        text = text.replace(/^#{1,2}\s+/gm, '');
        
        // Remove bold formatting (**)
        text = text.replace(/\*\*(.*?)\*\*/g, '$1');
        
        // Remove italic formatting (*)
        text = text.replace(/\*(.*?)\*/g, '$1');
        
        return text.trim();
    }

    /**
     * Creates a downloadable file using Blob and triggers browser download.
     * 
     * @param content - File content
     * @param filename - Name of the file to download
     * @param mimeType - MIME type of the file
     */
    private downloadFile(content: string, filename: string, mimeType: string): void {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
    }
}

/**
 * Product Interface - DocumentExporter
 * 
 * This interface defines the contract that all concrete exporters must implement.
 * In the Factory Method pattern, this represents the "Product" interface.
 * 
 * The Factory Method pattern uses this interface to decouple the client code
 * from the specific exporter implementations (PDF, TXT, DOCX).
 */
export interface DocumentExporter {
    /**
     * Exports the provided markdown content to a specific format.
     * 
     * Each concrete implementation will:
     * 1. Parse the markdown content according to its format requirements
     * 2. Generate the appropriate file format
     * 3. Trigger a download in the browser
     * 
     * @param content - Markdown formatted text to export
     */
    export(content: string): void;
}

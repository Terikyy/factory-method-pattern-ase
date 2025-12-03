import type { ExporterFactory } from './interfaces';
import { PDFExporterFactory, TXTExporterFactory, DOCXExporterFactory } from './factories';

/**
 * Main Application Entry Point
 * 
 * This is the Client in the Factory Method pattern.
 * The client works with the factory interface (ExporterFactory) and doesn't
 * need to know about concrete product classes (PDFExporter, TXTExporter, DOCXExporter).
 * 
 * Factory Method pattern benefits demonstrated here:
 * - Client code is decoupled from concrete product instantiation
 * - Adding new export formats requires no changes to client code
 * - Polymorphism enables working with any ExporterFactory implementation
 */

/**
 * Gets the appropriate factory based on the selected export format.
 * This function demonstrates the Factory Method pattern - the client
 * delegates object creation to factory classes.
 * 
 * @param format - The export format ('txt', 'pdf', 'docx')
 * @returns The appropriate ExporterFactory instance
 */
function getFactory(format: string): ExporterFactory {
    switch (format.toLowerCase()) {
        case 'txt':
            return new TXTExporterFactory();
        case 'pdf':
            return new PDFExporterFactory();
        case 'docx':
            return new DOCXExporterFactory();
        default:
            console.error(`Unknown format: ${format}. Defaulting to TXT.`);
            return new TXTExporterFactory();
    }
}

/**
 * Handles the export button click event.
 * 
 * Workflow:
 * 1. Get user input (markdown content and format selection)
 * 2. Validate input
 * 3. Get appropriate factory using Factory Method pattern
 * 4. Use factory to create exporter (Factory Method)
 * 5. Export using the created product
 */
async function handleExport(): Promise<void> {
    // Get DOM elements
    const markdownInput = document.getElementById('markdown-input') as HTMLTextAreaElement;
    const formatSelect = document.getElementById('format-select') as HTMLSelectElement;

    if (!markdownInput || !formatSelect) {
        console.error('Required DOM elements not found');
        return;
    }

    // Get user input
    const content = markdownInput.value;
    const format = formatSelect.value;

    // Validate input
    if (!content || content.trim().length === 0) {
        alert('Please enter some content to export.');
        return;
    }

    // Factory Method Pattern in action:
    // 1. Get the appropriate factory
    const factory = getFactory(format);
    
    // 2. Use factory method to create the product
    const exporter = factory.createExporter();
    
    // 3. Use the product
    console.log(`Exporting as ${format.toUpperCase()}...`);
    await exporter.export(content.trim());
}

/**
 * Initialize the application when DOM is loaded.
 * Sets up event listeners for the UI.
 */
function init(): void {
    console.log('Document Exporter - Factory Method Pattern Demo');
    console.log('Application initialized');

    // Get export button and attach event listener
    const exportButton = document.getElementById('export-button');
    
    if (exportButton) {
        exportButton.addEventListener('click', handleExport);
        console.log('Export button event listener attached');
    } else {
        console.error('Export button not found');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

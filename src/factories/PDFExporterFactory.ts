import type { ExporterFactory } from '../interfaces';
import { PDFExporter } from '../products';

/**
 * Concrete Creator - PDFExporterFactory
 * 
 * This class is a "Concrete Creator" in the Factory Method pattern.
 * It implements the factory method (createExporter) to instantiate
 * and return a PDFExporter product.
 * 
 * The Factory Method pattern allows this class to decide which concrete
 * product to create, decoupling the client from the specific product class.
 */
export class PDFExporterFactory implements ExporterFactory {
    /**
     * Factory Method Implementation - Creates PDFExporter instance.
     * 
     * This is the core Factory Method that decides which concrete product
     * to instantiate. By overriding this method, we define that this factory
     * creates PDF exporters specifically.
     * 
     * @returns A new PDFExporter instance
     */
    createExporter() {
        console.log('PDFExporterFactory: Creating PDF exporter...');
        return new PDFExporter();
    }
}

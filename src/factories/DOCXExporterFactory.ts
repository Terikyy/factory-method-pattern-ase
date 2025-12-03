import type { ExporterFactory } from '../interfaces';
import { DOCXExporter } from '../products';

/**
 * Concrete Creator - DOCXExporterFactory
 * 
 * This class is a "Concrete Creator" in the Factory Method pattern.
 * It implements the factory method (createExporter) to instantiate
 * and return a DOCXExporter product.
 * 
 * The Factory Method pattern allows this class to decide which concrete
 * product to create, decoupling the client from the specific product class.
 */
export class DOCXExporterFactory implements ExporterFactory {
    /**
     * Factory Method Implementation - Creates DOCXExporter instance.
     * 
     * This is the core Factory Method that decides which concrete product
     * to instantiate. By overriding this method, we define that this factory
     * creates DOCX exporters specifically.
     * 
     * @returns A new DOCXExporter instance
     */
    createExporter() {
        console.log('DOCXExporterFactory: Creating DOCX exporter...');
        return new DOCXExporter();
    }
}

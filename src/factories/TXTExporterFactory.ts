import type { ExporterFactory } from '../interfaces';
import { TXTExporter } from '../products';

/**
 * Concrete Creator - TXTExporterFactory
 * 
 * This class is a "Concrete Creator" in the Factory Method pattern.
 * It implements the factory method (createExporter) to instantiate
 * and return a TXTExporter product.
 * 
 * The Factory Method pattern allows this class to decide which concrete
 * product to create, decoupling the client from the specific product class.
 */
export class TXTExporterFactory implements ExporterFactory {
    /**
     * Factory Method Implementation - Creates TXTExporter instance.
     * 
     * This is the core Factory Method that decides which concrete product
     * to instantiate. By overriding this method, we define that this factory
     * creates TXT exporters specifically.
     * 
     * @returns A new TXTExporter instance
     */
    createExporter() {
        console.log('TXTExporterFactory: Creating TXT exporter...');
        return new TXTExporter();
    }
}

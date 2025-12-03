import type { DocumentExporter } from './DocumentExporter.interface';

/**
 * Abstract Factory Interface - ExporterFactory
 * 
 * This interface represents the "Creator" in the Factory Method pattern.
 * It declares the factory method (createExporter) that subclasses must implement
 * to instantiate specific product types.
 * 
 * The Factory Method pattern delegates the instantiation of concrete products
 * to subclasses, allowing the system to be extended with new exporters
 * without modifying existing code (Open/Closed Principle).
 */
export interface ExporterFactory {
    /**
     * Factory Method - The core of the Factory Method pattern.
     * 
     * This abstract method must be implemented by concrete factories to return
     * a specific DocumentExporter instance (PDFExporter, TXTExporter, or DOCXExporter).
     * 
     * Each concrete factory decides which product class to instantiate,
     * enabling polymorphic behavior without the client knowing the concrete type.
     * 
     * @returns A DocumentExporter instance (concrete product)
     */
    createExporter(): DocumentExporter;
}

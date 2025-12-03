# Factory Method Pattern - Document Converter

Implementation of the Factory Method design pattern for Advanced Software Engineering at DHBW Stuttgart.

## Overview

This project demonstrates the **Factory Method** design pattern through a web-based document converter that transforms Markdown content into multiple export formats (TXT, PDF, DOCX).

## Features

- **Markdown Input**: Interface for writing markdown content
- **Multiple Export Formats**:
  - **TXT**: Plain text with markdown syntax stripped
  - **PDF**: PDF with full formatting support
  - **DOCX**: Microsoft Word document with full formatting support
- **Factory Method Pattern**: Each exporter is created through its dedicated factory

## Architecture

The project follows the Factory Method pattern with:

- **Product Interface**: `DocumentExporter` - defines the export contract
- **Concrete Products**: `PDFExporter`, `TXTExporter`, `DOCXExporter` - implement different export strategies
- **Creator Interface**: `ExporterFactory` - declares the factory method
- **Concrete Creators**: `PDFExporterFactory`, `TXTExporterFactory`, `DOCXExporterFactory` - instantiate specific exporters

## Technologies

- **TypeScript**: Strongly-typed implementation
- **Vite**: Build tool and dev server

## Dependencies

- **jsPDF**: PDF generation library with built-in `.save()` method for direct downloads
- **docx**: Word document generation library that outputs Blobs
- **file-saver**: Cross-browser file download utility - required only for DOCX export since the `docx` library returns Blobs instead of handling downloads directly (unlike jsPDF which has its own save method)

## Setup

_Docker setup guide will be added here._

## Usage

1. Open the application in your browser
2. Enter markdown content in the left panel
3. Select your desired export format (TXT, PDF, or DOCX)
4. Click "Export Document" to download

## Markdown Syntax Support

- `# Heading 1` - Large heading
- `## Heading 2` - Medium heading
- `**bold text**` - Bold formatting
- `*italic text*` - Italic formatting

## Testing

_Testing documentation will be added here._

## License

Educational project for DHBW Stuttgart.

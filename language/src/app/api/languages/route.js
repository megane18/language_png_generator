import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to our data file
const dataFilePath = path.join(process.cwd(), 'data', 'languages.json');

// Helper to ensure the data directory exists
const ensureDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Helper to read languages from file
const getLanguages = () => {
  ensureDirectoryExists();
  
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
    return []; // Return empty array if file doesn't exist yet
  } catch (error) {
    console.error('Error reading languages:', error);
    return [];
  }
};

// Helper to write languages to file
const saveLanguages = (languages) => {
  ensureDirectoryExists();
  fs.writeFileSync(dataFilePath, JSON.stringify(languages, null, 2));
};

// GET handler - retrieve all languages
export async function GET() {
  const languages = getLanguages();
  return NextResponse.json(languages);
}

// POST handler - add a new language
export async function POST(request) {
  try {
    const newLanguage = await request.json();
    
    // Basic validation
    if (!newLanguage.name || !newLanguage.sampleText) {
      return NextResponse.json(
        { error: 'Name and sample text are required' },
        { status: 400 }
      );
    }
    
    const languages = getLanguages();
    
    // Check if language already exists
    if (languages.some(lang => 
      lang.name.toLowerCase() === newLanguage.name.toLowerCase()
    )) {
      return NextResponse.json(
        { error: 'Language already exists' },
        { status: 409 }
      );
    }
    
    // Add the new language
    languages.push(newLanguage);
    saveLanguages(languages);
    
    return NextResponse.json(
      { message: 'Language added successfully', language: newLanguage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding language:', error);
    return NextResponse.json(
      { error: 'Failed to add language' },
      { status: 500 }
    );
  }
}

// DELETE handler - reset languages
export async function DELETE() {
  try {
    saveLanguages([]);
    return NextResponse.json({ message: 'Languages reset successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reset languages' }, { status: 500 });
  }
}
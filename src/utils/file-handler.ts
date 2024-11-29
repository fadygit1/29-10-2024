export class FileHandler {
  static async readTextFile(file: File): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);
        resolve(lines);
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  static async saveToFile(data: string[], filePath: string): Promise<void> {
    try {
      const blob = new Blob([data.join('\n')], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filePath;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error(`Failed to save file: ${error.message}`);
    }
  }
}
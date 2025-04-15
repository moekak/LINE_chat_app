class CropperError extends Error{
      constructor(message, context) {
            super(message);
            this.name = 'CropperError';
            this.context = context;
            this.timestamp = new Date();
      }
}

export default CropperError;
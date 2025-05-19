class BarcodeGenerator {
    constructor() {
        this.barcodeElement = document.getElementById('barcode');
        this.userCode = 'ST-' + this.generateUserCode();
        this.init();
    }
    
    init() {
        this.generateBarcode();
        this.setupEventListeners();
    }
    
    generateUserCode() {
        // En producción, esto vendría de la base de datos
        const userId = localStorage.getItem('userId') || '20240001';
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        return `${userId}-${randomSuffix}`;
    }
    
    generateBarcode() {
        JsBarcode(this.barcodeElement, this.userCode, {
            format: "CODE128",
            lineColor: "#000",
            width: 2,
            height: 60,
            displayValue: true,
            fontSize: 16,
            margin: 10
        });
    }
    
    refreshBarcode() {
        this.userCode = 'ST-' + this.generateUserCode();
        this.generateBarcode();
    }
    
    downloadBarcode() {
        const svg = this.barcodeElement;
        const serializer = new XMLSerializer();
        const svgBlob = new Blob([serializer.serializeToString(svg)], 
            {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `codigo-safetecs-${this.userCode}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    setupEventListeners() {
        document.getElementById('refreshBarcode').addEventListener('click', () => {
            this.refreshBarcode();
        });
        
        document.getElementById('downloadBarcode').addEventListener('click', () => {
            this.downloadBarcode();
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new BarcodeGenerator();
});
import puppeteer from 'puppeteer';
import path from 'path';
import prisma from '@/prisma';

export const generateInvoicePDF = async (invoiceId: string): Promise<string> => {
  try {
    
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { client: true, invoiceItems: { include: { product: true } } }, 
    });

    if (!invoice) throw new Error('Invoice not found');

    
    const htmlContent = `
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h2 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid black; padding: 10px; text-align: left; }
              th { background-color: #f2f2f2; }
          </style>
      </head>
      <body>
          <h2>Invoice #${invoice.id}</h2>
          <p><strong>Client:</strong> ${invoice.client.name}</p>
          <p><strong>Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
          
          <table>
              <thead>
                  <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                  </tr>
              </thead>
              <tbody>
                  ${invoice.invoiceItems
                    .map(
                      (item) => `
                      <tr>
                          <td>${item.product.name}</td>
                          <td>${item.quantity}</td>
                          <td>Rp.${item.price.toFixed(2)}</td>
                          <td>Rp.${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                  `,
                    )
                    .join('')}
              </tbody>
          </table>
          
          <h3 style="text-align: right;">Total: Rp.${invoice.total.toFixed(2)}</h3>
      </body>
      </html>
    `;

    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    
    
    const pdfPath = path.join(__dirname, `../../storage/invoice-${invoice.id}.pdf`);
    
    
    await page.pdf({ path: pdfPath, format: 'A4' });

    
    await browser.close();

    return pdfPath;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate invoice PDF');
  }
};

// Funções de exportação para PDF e Excel

// Exportar para PDF usando jsPDF
function exportToPDF() {
    // Carregar jsPDF dinamicamente
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Obter dados
        const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
        let charactersData = JSON.parse(localStorage.getItem('charactersData') || '{}');
        
        // Garantir que todos os personagens tenham dados (usar valores padrão se não existirem)
        const allCharactersData = {};
        characters.forEach(char => {
            if (charactersData[char.name]) {
                allCharactersData[char.name] = charactersData[char.name];
            } else {
                // Usar valores padrão
                allCharactersData[char.name] = {
                    attack: '1000',
                    level: '1',
                    class: '1',
                    tower: '1',
                    awakened: false
                };
            }
        });
        
        // Configurações do documento
        doc.setFontSize(20);
        doc.text('Relatorio Grand Chase', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text(`Conta: ${accountData.accountName || 'Nao informado'}`, 20, 40);
        doc.text(`Nivel Cartas: ${accountData.cardLevel || 'Nao informado'}`, 20, 50);
        doc.text(`Chase Level: ${accountData.chaseLevel || 'Nao informado'}`, 20, 60);
        
        // Estatisticas
        const awakenedCount = Object.values(allCharactersData).filter(char => char.awakened).length;
        const totalAttack = Object.values(allCharactersData).reduce((sum, char) => sum + (parseInt(char.attack) || 1000), 0);
        const levels = Object.values(allCharactersData).map(char => parseInt(char.level) || 1);
        const avgLevel = levels.length > 0 ? Math.round(levels.reduce((a, b) => a + b, 0) / levels.length) : 1;
        
        doc.setFontSize(14);
        doc.text('Estatisticas Gerais:', 20, 80);
        
        doc.setFontSize(10);
        doc.text(`Personagens Despertados: ${awakenedCount}/24`, 20, 90);
        doc.text(`ATK Total: ${totalAttack.toLocaleString()}`, 20, 100);
        doc.text(`Nivel Medio: ${avgLevel}`, 20, 110);
        
        // Personagens
        doc.setFontSize(14);
        doc.text('Dados dos Personagens:', 20, 130);
        
        let yPosition = 140;
        doc.setFontSize(8);
        
        Object.entries(allCharactersData).forEach(([name, data]) => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
            
            const isDefault = !charactersData[name];
            const defaultText = isDefault ? ' (padrão)' : '';
            
            const line = `${name}: Lvl ${data.level}${defaultText} | Classe ${data.class}${defaultText} | ATK ${data.attack}${defaultText} | Torre ${data.tower}${defaultText} ${data.awakened ? '(Desp)' : ''}`;
            doc.text(line, 20, yPosition);
            yPosition += 10;
        });
        
        // Salvar PDF
        const fileName = `grand_chase_relatorio_${accountData.accountName || 'sem_nome'}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        alert('PDF exportado com sucesso!');
    };
    document.head.appendChild(script);
}

// Exportar para Excel usando SheetJS
function exportToExcel() {
    // Carregar SheetJS dinamicamente
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.onload = function() {
        const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
        let charactersData = JSON.parse(localStorage.getItem('charactersData') || '{}');
        
        // Garantir que todos os personagens tenham dados (usar valores padrão se não existirem)
        const allCharactersData = {};
        characters.forEach(char => {
            if (charactersData[char.name]) {
                allCharactersData[char.name] = charactersData[char.name];
            } else {
                // Usar valores padrão
                allCharactersData[char.name] = {
                    attack: '1000',
                    level: '1',
                    class: '1',
                    tower: '1',
                    awakened: false
                };
            }
        });
        
        // Criar workbook
        const wb = XLSX.utils.book_new();
        
        // Planilha de resumo da conta
        const accountDataWS = [
            ['Relatorio Grand Chase'],
            [''],
            ['Informacoes da Conta'],
            ['Nome da Conta', accountData.accountName || 'Nao informado'],
            ['Nivel de Colecao de Cartas', accountData.cardLevel || 'Nao informado'],
            ['Chase Level', accountData.chaseLevel || 'Nao informado'],
            [''],
            ['Estatisticas Gerais']
        ];
        
        // Calcular estatisticas
        const awakenedCount = Object.values(allCharactersData).filter(char => char.awakened).length;
        const totalAttack = Object.values(allCharactersData).reduce((sum, char) => sum + (parseInt(char.attack) || 1000), 0);
        const levels = Object.values(allCharactersData).map(char => parseInt(char.level) || 1);
        const avgLevel = levels.length > 0 ? Math.round(levels.reduce((a, b) => a + b, 0) / levels.length) : 1;
        
        accountDataWS.push(
            ['Personagens Totais', '24'],
            ['Personagens Despertados', awakenedCount],
            ['ATK Total', totalAttack],
            ['Nivel Medio', avgLevel]
        );
        
        // Planilha de personagens
        const charactersWS = [
            ['Personagem', 'Nivel', 'Classe', 'ATK Total', 'Despertado', 'Andar Torre', 'Tipo de Valor']
        ];
        
        Object.entries(allCharactersData).forEach(([name, data]) => {
            const isDefault = !charactersData[name];
            const valueType = isDefault ? 'Padrão' : 'Informado';
            
            charactersWS.push([
                name,
                data.level,
                data.class,
                data.attack,
                data.awakened ? 'Sim' : 'Nao',
                data.tower,
                valueType
            ]);
        });
        
        // Planilha de progresso da torre
        const towerWS = [
            ['Personagem', 'Andar Torre', 'Tipo de Valor'],
            ...Object.entries(allCharactersData)
                .filter(([name, data]) => data.tower && data.tower > 0)
                .sort((a, b) => b[1].tower - a[1].tower)
                .map(([name, data]) => {
                    const isDefault = !charactersData[name];
                    const valueType = isDefault ? 'Padrão' : 'Informado';
                    return [name, data.tower, valueType];
                })
        ];
        
        // Adicionar planilhas ao workbook
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(accountDataWS), 'Resumo');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(charactersWS), 'Personagens');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(towerWS), 'Torre das Ilusoes');
        
        // Salvar arquivo Excel
        const fileName = `grand_chase_relatorio_${accountData.accountName || 'sem_nome'}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
        alert('Excel exportado com sucesso!');
    };
    document.head.appendChild(script);
}

// Exportar para CSV (alternativa mais leve)
function exportToCSV() {
    const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
    let charactersData = JSON.parse(localStorage.getItem('charactersData') || '{}');
    
    // Garantir que todos os personagens tenham dados (usar valores padrão se não existirem)
    const allCharactersData = {};
    characters.forEach(char => {
        if (charactersData[char.name]) {
            allCharactersData[char.name] = charactersData[char.name];
        } else {
            // Usar valores padrão
            allCharactersData[char.name] = {
                attack: '1000',
                level: '1',
                class: '1',
                tower: '1',
                awakened: false
            };
        }
    });
    
    // Criar CSV
    let csv = 'Personagem,Nivel,Classe,ATK Total,Despertado,Andar Torre,Tipo de Valor\n';
    
    Object.entries(allCharactersData).forEach(([name, data]) => {
        const isDefault = !charactersData[name];
        const valueType = isDefault ? 'Padrão' : 'Informado';
        
        csv += `"${name}",${data.level},${data.class},${data.attack},${data.awakened ? 'Sim' : 'Nao'},${data.tower},"${valueType}"\n`;
    });
    
    // Adicionar estatisticas no final
    csv += '\n\nEstatisticas Gerais\n';
    csv += `Nome da Conta,${accountData.accountName || 'Nao informado'}\n`;
    csv += `Nivel de Colecao de Cartas,${accountData.cardLevel || 'Nao informado'}\n`;
    csv += `Chase Level,${accountData.chaseLevel || 'Nao informado'}\n`;
    
    const awakenedCount = Object.values(allCharactersData).filter(char => char.awakened).length;
    const totalAttack = Object.values(allCharactersData).reduce((sum, char) => sum + (parseInt(char.attack) || 1000), 0);
    const levels = Object.values(allCharactersData).map(char => parseInt(char.level) || 1);
    const avgLevel = levels.length > 0 ? Math.round(levels.reduce((a, b) => a + b, 0) / levels.length) : 1;
    
    csv += `Personagens Despertados,${awakenedCount}/24\n`;
    csv += `ATK Total,${totalAttack}\n`;
    csv += `Nivel Medio,${avgLevel}\n`;
    
    // Download do CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `grand_chase_relatorio_${accountData.accountName || 'sem_nome'}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('CSV exportado com sucesso!');
}

// Funcao para imprimir relatorio
function printReport() {
    const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
    let charactersData = JSON.parse(localStorage.getItem('charactersData') || '{}');
    
    // Garantir que todos os personagens tenham dados (usar valores padrão se não existirem)
    const allCharactersData = {};
    characters.forEach(char => {
        if (charactersData[char.name]) {
            allCharactersData[char.name] = charactersData[char.name];
        } else {
            // Usar valores padrão
            allCharactersData[char.name] = {
                attack: '1000',
                level: '1',
                class: '1',
                tower: '1',
                awakened: false
            };
        }
    });
    
    // Calcular estatísticas com dados completos
    const awakenedCount = Object.values(allCharactersData).filter(char => char.awakened).length;
    const totalAttack = Object.values(allCharactersData).reduce((sum, char) => sum + (parseInt(char.attack) || 1000), 0);
    const levels = Object.values(allCharactersData).map(char => parseInt(char.level) || 1);
    const avgLevel = levels.length > 0 ? Math.round(levels.reduce((a, b) => a + b, 0) / levels.length) : 1;
    
    // Criar HTML para impressao
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Relatorio Grand Chase</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { text-align: center; color: #ff6b35; }
                h2 { color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 5px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
                .stat-item { padding: 10px; background: #f9f9f9; border-radius: 5px; }
                .default-value { color: #999; font-style: italic; }
                @media print { body { margin: 10px; } }
            </style>
        </head>
        <body>
            <h1>Relatorio Grand Chase</h1>
            
            <h2>Informacoes da Conta</h2>
            <table>
                <tr><th>Nome da Conta</th><td>${accountData.accountName || 'Nao informado'}</td></tr>
                <tr><th>Nivel de Colecao de Cartas</th><td>${accountData.cardLevel || 'Nao informado'}</td></tr>
                <tr><th>Chase Level</th><td>${accountData.chaseLevel || 'Nao informado'}</td></tr>
            </table>
            
            <h2>Estatisticas Gerais</h2>
            <div class="stats">
                <div class="stat-item"><strong>Personagens Totais:</strong> 24</div>
                <div class="stat-item"><strong>Personagens Despertados:</strong> ${awakenedCount}/24</div>
                <div class="stat-item"><strong>ATK Total:</strong> ${totalAttack.toLocaleString()}</div>
                <div class="stat-item"><strong>Nivel Medio:</strong> ${avgLevel}</div>
            </div>
            
            <h2>Dados dos Personagens</h2>
            <table>
                <thead>
                    <tr>
                        <th>Personagem</th>
                        <th>Nivel</th>
                        <th>Classe</th>
                        <th>ATK Total</th>
                        <th>Despertado</th>
                        <th>Andar Torre</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(allCharactersData).map(([name, data]) => {
                        const isDefault = !charactersData[name]; // Verifica se era um valor padrão
                        return `
                            <tr>
                                <td>${name}</td>
                                <td>${data.level}${isDefault ? ' <span class="default-value">(padrão)</span>' : ''}</td>
                                <td>${data.class}${isDefault ? ' <span class="default-value">(padrão)</span>' : ''}</td>
                                <td>${data.attack}${isDefault ? ' <span class="default-value">(padrão)</span>' : ''}</td>
                                <td>${data.awakened ? 'Sim' : 'Não'}</td>
                                <td>${data.tower}${isDefault ? ' <span class="default-value">(padrão)</span>' : ''}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
            
            <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
                Gerado em ${new Date().toLocaleString('pt-BR')}
            </p>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Tornar funcoes globais
window.exportToPDF = exportToPDF;
window.exportToExcel = exportToExcel;
window.exportToCSV = exportToCSV;
window.printReport = printReport;

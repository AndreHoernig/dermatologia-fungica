// Conteudos detalhados com imagens (mesmo de antes)
const conteudos = {
    tinea: {
        titulo: "Tinea pedis (Frieira)",
        texto: `
            <strong>O que e?</strong><br>
            Infeccao fungica superficial dos pes causada por dermatofitos (Trichophyton rubrum, T. mentagrophytes).<br><br>
            <strong>Sintomas principais:</strong><br>
            - Coceira, descamacao e maceracao entre os dedos<br>
            - Rachaduras, mau odor e possivel extensao para unhas (onicomicose)<br><br>
            <strong>Prevencao:</strong><br>
            • Secar bem os pes, especialmente entre os dedos<br>
            • Usar calcados arejados e meias de algodao<br>
            • Evitar andar descalco em vestiarios, piscinas e saunas<br>
            • Nao compartilhar toalhas ou calcados<br><br>
            <strong>Tratamento:</strong><br>
            Antifungicos topicos (clotrimazol, terbinafina) por 2 a 4 semanas. Casos extensos ou recidivantes: terapia oral com acompanhamento medico.
        `,
        imagens: [
            { src: "img/tinea1.jpg", legenda: "Maceracao interdigital tipica" },
            { src: "img/tinea2.jpg", legenda: "Descamacao e vermelhidao" }
        ]
    },
    cromo: {
        titulo: "Cromomicose",
        texto: `
            <strong>O que e?</strong><br>
            Infeccao fungica cronica do tecido subcutaneo e pele, causada por fungos demaceos (generos Fonsecaea, Cladophialophora, Phialophora).<br><br>
            <strong>Transmissao:</strong><br>
            Inoculacao traumatica por espinhos, lascas de madeira ou solo contaminado. Comum em trabalhadores rurais de regioes tropicais.<br><br>
            <strong>Manifestacoes clinicas:</strong><br>
            - Papulas ou nodulos que evoluem para lesoes verrucosas com aspecto de "couve-flor"<br>
            - Geralmente em membros inferiores, evolucao lenta (anos)<br><br>
            <strong>Prevencao:</strong><br>
            • Uso de luvas, botas e roupas de protecao no trabalho rural<br>
            • Limpeza adequada de ferimentos com terra/espinhos<br>
            • Diagnostico precoce por exame micologico<br><br>
            <strong>Tratamento:</strong><br>
            Antifungicos orais prolongados (itraconazol, terbinafina), associados a crioterapia, cirurgia ou laser em casos refratarios. Acompanhamento dermatologico essencial.
        `,
        imagens: [
            { src: "img/cromo1.jpg", legenda: "Lesao verrucosa inicial" },
            { src: "img/cromo2.jpg", legenda: "Aspecto de couve-flor (caso cronico)" }
        ]
    }
};

// Modal de detalhes
const detalhesContainer = document.getElementById('detalhesContainer');
const detalhesConteudo = document.getElementById('detalhesConteudo');
const btnFechar = document.getElementById('btnFecharDetalhes');

function gerarGaleria(imagens) {
    if (!imagens || imagens.length === 0) return '';
    let html = '<div class="galeria-imagens"><h4>Imagens clinicas (clique para ampliar)</h4><div class="img-grid">';
    imagens.forEach(img => {
        html += `
            <div class="img-card">
                <img src="${img.src}" alt="${img.legenda}" onclick="abrirLightbox('${img.src}')">
                <span>${img.legenda}</span>
            </div>
        `;
    });
    html += '</div></div>';
    return html;
}

document.querySelectorAll('.btn-detalhes').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const doenca = btn.getAttribute('data-doenca');
        const dados = conteudos[doenca];
        const galeriaHtml = gerarGaleria(dados.imagens);
        detalhesConteudo.innerHTML = `
            <h2>${dados.titulo}</h2>
            <div>${dados.texto}</div>
            ${galeriaHtml}
        `;
        detalhesContainer.style.display = 'flex';
    });
});

function fecharDetalhes() {
    detalhesContainer.style.display = 'none';
}
if (btnFechar) {
    btnFechar.addEventListener('click', fecharDetalhes);
    detalhesContainer.addEventListener('click', (e) => {
        if (e.target === detalhesContainer) fecharDetalhes();
    });
}

// Lightbox
function abrirLightbox(src) {
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="fechar-lightbox">x</div>
            <img id="lightboxImg" src="">
        `;
        document.body.appendChild(lightbox);
        
        const fechar = lightbox.querySelector('.fechar-lightbox');
        fechar.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }
    const imgElement = document.getElementById('lightboxImg');
    imgElement.src = src;
    lightbox.classList.add('active');
}
window.abrirLightbox = abrirLightbox;

// ========== QUIZ COM 8 PERGUNTAS (5 originais + 3 sobre medicamentos) ==========
const perguntas = [
    // Perguntas originais (1 a 5)
    {
        texto: "Qual o principal agente etiologico da Tinea pedis?",
        opcoes: ["Candida albicans", "Trichophyton rubrum", "Malassezia furfur", "Aspergillus niger"],
        correta: 1,
        explicacao: "Trichophyton rubrum e o dermatofito mais comum associado a Tinea pedis cronica."
    },
    {
        texto: "A cromomicose e causada por fungos do grupo:",
        opcoes: ["Hialohifomicetos", "Zigomicetos", "Demaceos", "Leveduras do genero Cryptococcus"],
        correta: 2,
        explicacao: "Fungos demaceos (pigmentados) sao os agentes etiologicos da cromomicose."
    },
    {
        texto: "Qual destes NAO e um fator de risco para Tinea pedis?",
        opcoes: ["Andar descalco em vestiarios", "Uso de calcados fechados por longas horas", "Exposicao solar intensa", "Pes umidos apos banho sem secagem adequada"],
        correta: 2,
        explicacao: "Exposicao solar nao e fator de risco; ambientes quentes e umidos favorecem os fungos."
    },
    {
        texto: "A principal forma de inoculacao da cromomicose no ser humano e:",
        opcoes: ["Inalacao de esporos", "Ingestao de agua contaminada", "Trauma com material vegetal (espinhos, lascas)", "Contato direto entre pessoas"],
        correta: 2,
        explicacao: "A inoculacao traumatica com espinhos ou lascas de madeira e a porta de entrada mais comum."
    },
    {
        texto: "Qual medida e eficaz na prevencao da Tinea pedis?",
        opcoes: ["Usar talco antisseptico diariamente", "Secar bem os espacos interdigitais dos pes", "Calcar meias de nylon", "Andar sempre descalco em casa"],
        correta: 1,
        explicacao: "Secar os espacos entre os dedos evita a umidade que favorece o crescimento fúngico."
    },
    
    // Novas perguntas sobre medicamentos (6 a 8)
    {
        texto: "Qual antifungico topico e considerado primeira linha para Tinea pedis leve?",
        opcoes: ["Terbinafina em creme", "Fluconazol oral", "Anfotericina B injetavel", "Griseofulvina comprimidos"],
        correta: 0,
        explicacao: "Terbinafina topica tem alta eficacia contra dermatofitos e boa penetracao na pele."
    },
    {
        texto: "Na cromomicose, qual antifungico oral e mais utilizado em tratamentos prolongados?",
        opcoes: ["Fluconazol", "Itraconazol", "Cetoconazol", "Nistatina"],
        correta: 1,
        explicacao: "Itraconazol e a droga de escolha para cromomicose, com esquemas que duram meses a anos."
    },
    {
        texto: "Qual medicamento apresenta risco de hepatotoxicidade quando associado a terbinafina oral?",
        opcoes: ["Paracetamol em dose terapeutica", "Anticoncepcional oral", "Cimetidina", "Amoxicilina"],
        correta: 2,
        explicacao: "Cimetidina inibe o metabolismo hepatico da terbinafina, aumentando risco de lesao hepatica."
    }
];

// Renderizar quiz
const quizContainer = document.getElementById('quizContainer');
function renderizarQuiz() {
    if (!quizContainer) return;
    let html = '';
    perguntas.forEach((p, idx) => {
        html += `
            <div class="quiz-pergunta" data-pergunta="${idx}">
                <p><strong>${idx+1}.</strong> ${p.texto}</p>
                <div class="quiz-opcoes">
                    ${p.opcoes.map((opcao, optIdx) => `
                        <label>
                            <input type="radio" name="pergunta${idx}" value="${optIdx}">
                            ${opcao}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    quizContainer.innerHTML = html;
}
renderizarQuiz();

// Mensagens personalizadas para cada numero de acertos (0 a 8)
const mensagensPorAcerto = {
    0: "Voce nao acertou nenhuma questao. Recomendamos revisar os conceitos basicos sobre Tinea pedis, cromomicose e antifungicos antes de nova tentativa.",
    1: "Voce acertou 1 de 8 questoes. Ha lacunas importantes. Estude os agentes etiologicos, prevencao e tratamento basico.",
    2: "Voce acertou 2 de 8 questoes. Melhore seu conhecimento sobre fatores de risco e antifungicos topicos.",
    3: "Voce acertou 3 de 8 questoes. Uma base inicial, mas precisa revisar mecanismos de transmissao e medicacoes.",
    4: "Voce acertou 4 de 8 questoes. Metade do caminho! Foque nas perguntas sobre tratamento e interacoes medicamentosas.",
    5: "Voce acertou 5 de 8 questoes. Bom desempenho! Reveja principalmente as questoes sobre antifungicos orais.",
    6: "Voce acertou 6 de 8 questoes. Muito bom! Voce domina a maior parte do conteudo.",
    7: "Voce acertou 7 de 8 questoes. Excelente! Apenas um pequeno detalhe a revisar.",
    8: "Voce acertou todas as 8 questoes. Dominio completo do tema! Parabens pelo conhecimento em micologia medica."
};

const btnCorrigir = document.getElementById('btnCorrigirQuiz');
const resultadoDiv = document.getElementById('resultadoQuiz');

if (btnCorrigir) {
    btnCorrigir.addEventListener('click', () => {
        let acertos = 0;
        let questoesErradas = [];
        
        perguntas.forEach((p, idx) => {
            const radios = document.getElementsByName(`pergunta${idx}`);
            let selecionado = null;
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    selecionado = parseInt(radios[i].value);
                    break;
                }
            }
            if (selecionado !== null && selecionado === p.correta) {
                acertos++;
            } else if (selecionado !== null) {
                questoesErradas.push(idx + 1);
            }
        });
        
        let mensagem = mensagensPorAcerto[acertos];
        
        if (questoesErradas.length > 0 && acertos < 8) {
            mensagem += ` Voce errou a(s) questao(ões): ${questoesErradas.join(", ")}. Confira o gabarito comentado abaixo.`;
        }
        
        // Gabarito comentado
        let gabaritoHtml = '<div style="margin-top: 1rem; text-align: left; border-top: 1px solid #ccc; padding-top: 1rem;"><strong>Gabarito comentado:</strong><br>';
        perguntas.forEach((p, idx) => {
            gabaritoHtml += `<br><strong>${idx+1}.</strong> ${p.opcoes[p.correta]}<br>`;
            gabaritoHtml += `<span style="font-size: 0.85rem; color: #555;">${p.explicacao}</span><br>`;
        });
        gabaritoHtml += '</div>';
        
        resultadoDiv.innerHTML = `<div>${mensagem}</div>${gabaritoHtml}`;
        resultadoDiv.className = `resultado-box ${acertos >= 6 ? 'aprovado' : 'reprovado'}`;
    });
}
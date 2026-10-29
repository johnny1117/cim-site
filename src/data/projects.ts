// Projetos de extensão do CIM-UFPB exibidos em /projetos.
// Para editar um texto, basta alterar o campo `summary` (cada item da lista é um parágrafo).
// As logos ficam em /public/projetos/<slug>.png.

export interface Project {
  slug: string;
  name: string;
  theme: string;
  logo: string;
  summary: string[];
  instagram?: { handle: string; url: string }[];
}

const CIM_IG = {
  handle: '@cimufpb',
  url: 'https://www.instagram.com/cimufpb/',
};

export const PROJECTS: Project[] = [
  {
    slug: 'acao-cim',
    name: 'AÇÃO CIM',
    theme: 'Doenças tropicais negligenciadas',
    logo: '/projetos/acao-cim.png',
    summary: [
      'O AÇÃO CIM é o projeto de extensão do CIM-UFPB dedicado à educação em saúde sobre as Doenças Tropicais Negligenciadas (DTNs), como dengue, doença de Chagas, esquistossomose, hanseníase, tuberculose e leishmaniose. São doenças que atingem principalmente populações em situação de vulnerabilidade social, com forte presença no Nordeste brasileiro, e que ainda carregam muito estigma.',
      'Os extensionistas transformam o conteúdo acadêmico em ações práticas e materiais didáticos acessíveis, como jogos educativos, oficinas de arte e materiais de divulgação científica, levando à comunidade escolar e às Unidades de Saúde da Família informações sobre prevenção, formas de contágio e tratamento. Entre as atividades já realizadas estão ações sobre hepatites virais e o Arraial do Conhecimento e do Amor, na USF do Bessa.',
      'No ambiente virtual, pelo site e pelo Instagram, o projeto alcança a população em geral, estudantes e profissionais de saúde com infográficos, vídeos e conteúdos científicos, além de canais para tirar dúvidas. O objetivo é combater os estigmas associados às DTNs e fortalecer o vínculo entre universidade e comunidade.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'cannabis-cim',
    name: 'CANNABIS CIM',
    theme: 'Cannabis medicinal',
    logo: '/projetos/cannabis-cim.png',
    summary: [
      'O CANNABIS CIM é o projeto de extensão do CIM-UFPB voltado à educação em saúde sobre a Cannabis medicinal, pensado para pacientes, cuidadores e a sociedade em geral. O projeto nasce diante do interesse crescente pelo uso terapêutico da Cannabis e das dificuldades regulatórias e de acesso a informação confiável que ainda cercam o tema.',
      'Os extensionistas convertem o conhecimento acadêmico em conteúdos explicativos: posts em carrossel, vídeos com entrevistas a pesquisadores e estudantes de diferentes cursos da saúde da UFPB e episódios do podcast Baseado em Cannabis, produzido pela própria equipe. Cada formato busca traduzir evidências científicas em uma linguagem clara, sem sensacionalismo.',
      'Pelo site e pelos perfis no Instagram, o projeto chega à população, a estudantes e a profissionais de saúde. O objetivo é combater a desinformação e o estigma associados à Cannabis, capacitar o público para um uso consciente e informado e fortalecer o diálogo entre a universidade, a comunidade e quem atua no cuidado em saúde.',
    ],
    instagram: [
      {
        handle: '@baseadoemcannabis_',
        url: 'https://www.instagram.com/baseadoemcannabis_/',
      },
      {
        handle: '@exploramente.ufpb',
        url: 'https://www.instagram.com/exploramente.ufpb/',
      },
    ],
  },
  {
    slug: 'cim-informa',
    name: 'CIM INFORMA',
    theme: 'Medicamentos para doenças crônicas',
    logo: '/projetos/cim-informa.png',
    summary: [
      'O CIM INFORMA é o projeto de extensão do CIM-UFPB dedicado à educação em saúde sobre medicamentos, seus efeitos adversos e as interações medicamentosas. O foco está nas classes de medicamentos usadas no tratamento de doenças crônicas que fazem parte do dia a dia de muitas famílias, como hipertensão arterial, diabetes, hipercolesterolemia, obesidade e asma.',
      'O objetivo é levar informação correta e de qualidade sobre esses tratamentos, promovendo o uso racional de medicamentos, combatendo a desinformação e esclarecendo as dúvidas dos pacientes. As ações acontecem em Unidades de Saúde da Família, como a USF São José, e contam com folders, banners, mostruários de medicamentos e dinâmicas que facilitam a compreensão e estimulam a troca entre os participantes, a exemplo das atividades sobre saúde da mulher e do Setembro Vermelho.',
      'Pelo site e pelo Instagram, o projeto vai além das portas da USF e alcança estudantes, profissionais que querem se manter atualizados e a população em geral, com publicações diretas e acessíveis.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'descarta-cim',
    name: 'DESCARTA CIM',
    theme: 'Armazenamento e descarte de medicamentos',
    logo: '/projetos/descarta-cim.png',
    summary: [
      'O DESCARTA CIM é o projeto de extensão da UFPB, vinculado ao Departamento de Ciências Farmacêuticas, que trabalha a conscientização sobre o armazenamento e o descarte adequado de medicamentos em João Pessoa, unindo educação em saúde e educação ambiental.',
      'Os extensionistas transformam conhecimento acadêmico em ações educativas, palestras e materiais informativos. Nas Unidades de Saúde da Família, o projeto implanta e monitora coletores para medicamentos vencidos ou em desuso, com atividades nas USFs Grotão, Eucalipto, São José e Altiplano. A equipe também atua em escolas públicas, participa de congressos, simpósios e eventos ambientais e já levou o tema a entrevistas em programas de televisão.',
      'No Instagram, o projeto divulga informações sobre logística reversa, legislação, pontos de coleta e os impactos ambientais do descarte incorreto. O objetivo é transformar informação em consciência e consciência em atitude, contribuindo para a preservação do meio ambiente, para a saúde pública e para uma comunidade mais responsável com os medicamentos que guarda em casa.',
    ],
    instagram: [
      {
        handle: '@descarta.cim',
        url: 'https://www.instagram.com/descarta.cim/',
      },
    ],
  },
  {
    slug: 'educacim',
    name: 'EDUCA CIM',
    theme: 'Educação em saúde nas escolas',
    logo: '/projetos/educacim.png',
    summary: [
      'O EDUCA CIM é o projeto de extensão do CIM-UFPB que leva a educação em saúde e o uso racional de medicamentos para dentro do ambiente escolar. A proposta parte da ideia de que hábitos de cuidado com a saúde se formam cedo e de que a escola é um espaço privilegiado para construir conhecimento que os estudantes levam para casa e compartilham com a família.',
      'Os extensionistas transformam temas como automedicação, leitura de bulas, armazenamento correto e os riscos da desinformação em atividades lúdicas, oficinas, rodas de conversa e materiais didáticos adaptados a cada faixa etária. As ações são planejadas em diálogo com professores e gestores das escolas parceiras, para que o conteúdo converse com a realidade de cada turma.',
      'Pelo site e pelo Instagram, o projeto também compartilha conteúdos educativos com estudantes, educadores e a população em geral. O objetivo é formar cidadãos mais críticos e autônomos nas decisões sobre a própria saúde, aproximando a universidade das escolas e fortalecendo a formação dos extensionistas como educadores em saúde.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'exporcim',
    name: 'EXPOR CIM',
    theme: 'Cinema, saúde e sociedade',
    logo: '/projetos/exporcim.png',
    summary: [
      'O EXPOR CIM: Cinema, Saúde e Sociedade é o projeto de extensão do CIM-UFPB que usa o audiovisual e a cultura pop como ferramentas de educação em saúde. A ideia é partir de filmes, séries e personagens que o público já conhece para abrir conversas sobre temas de saúde que costumam ser difíceis ou cercados de mitos.',
      'Presencialmente, o projeto realiza ações em escolas públicas, como a EEEFM Orlando Cavalcanti Gomes, abordando a prevenção de Infecções Sexualmente Transmissíveis e o uso de preservativos. No ambiente digital, publica no Instagram conteúdos baseados em evidências que dialogam com a cultura pop, como a análise sobre canetas emagrecedoras a partir de O Diabo Veste Prada e a discussão sobre resistência antimicrobiana com a série The Good Doctor.',
      'O objetivo principal do EXPOR CIM é combater a desinformação em saúde, estimular o pensamento crítico e fortalecer na comunidade uma cultura de prevenção, cuidado e uso adequado de medicamentos, mostrando que ciência e entretenimento podem caminhar juntos.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'interacim',
    name: 'InteraCIM',
    theme: 'Interações droga-nutriente',
    logo: '/projetos/interacim.png',
    summary: [
      'O InteraCIM – Interações Droga-Nutriente é o projeto do CIM-UFPB voltado à promoção do uso seguro e racional de medicamentos e suplementos alimentares. Ele se dedica às interações entre medicamentos e alimentos ou nutrientes, um tema pouco discutido no dia a dia, mas que pode interferir diretamente na eficácia e na segurança do tratamento e no estado nutricional dos pacientes.',
      'O trabalho parte dos medicamentos efetivamente dispensados em uma Unidade de Saúde da Família parceira. A equipe faz uma revisão da literatura científica sobre cada um deles e, a partir dela, desenvolve materiais educativos práticos, como tabelas de consulta, cartilhas e recursos lúdicos. Entre as ações, destacam-se as capacitações oferecidas aos profissionais de saúde que atendem a comunidade.',
      'A iniciativa busca ampliar o conhecimento sobre essas interações, contribuindo para uma prescrição e uma orientação mais seguras, conscientes e eficazes. Ao mesmo tempo, forma multiplicadores do conhecimento entre estudantes e profissionais de saúde, levando esse cuidado para além da universidade.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'previne-cim',
    name: 'PREVINE CIM',
    theme: 'Infecções sexualmente transmissíveis',
    logo: '/projetos/previne-cim.png',
    summary: [
      'O PREVINE CIM é o projeto de extensão do CIM-UFPB voltado à educação em saúde e ao enfrentamento das Infecções Sexualmente Transmissíveis (ISTs). Sua atuação parte de uma realidade em que a desinformação, o preconceito e o estigma ainda dificultam a prevenção, a testagem, o tratamento e o cuidado em saúde sexual.',
      'Por isso, o projeto transforma conhecimento científico em informação acessível por meio de palestras, oficinas, rodas de conversa e dinâmicas em Unidades de Saúde da Família e escolas públicas, como a EEEF Prof. Orlando Cavalcanti Gomes, em parceria com o EXPOR CIM, além de conteúdos digitais no Instagram. As ações abordam transmissão, prevenção, diagnóstico e tratamento, estimulando o autocuidado e escolhas conscientes.',
      'Ao criar espaços de escuta e troca de saberes, o PREVINE CIM busca fortalecer a autonomia da população, reduzir práticas de risco e romper estigmas. O projeto também contribui para a formação dos extensionistas, aproximando-os da comunidade e formando profissionais críticos e capazes de atuar com responsabilidade.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'reporter-cim',
    name: 'REPÓRTER CIM',
    theme: 'Jornalismo e divulgação científica',
    logo: '/projetos/reporter-cim.png',
    summary: [
      'O REPÓRTER CIM é o projeto de extensão do CIM-UFPB dedicado à divulgação científica em formato jornalístico. Ele nasce da necessidade de levar ao público notícias sobre medicamentos e saúde que sejam ao mesmo tempo confiáveis, atuais e fáceis de entender, em um cenário em que informações falsas ou distorcidas circulam com muita rapidez.',
      'Os extensionistas acompanham novidades da área, como aprovações de medicamentos, alertas de segurança, atualizações de diretrizes e estudos relevantes, e transformam esse conteúdo em reportagens, notas e entrevistas com especialistas. Cada publicação passa por checagem nas fontes técnico-científicas que orientam o trabalho do CIM, garantindo informação objetiva e imparcial.',
      'O resultado alimenta as seções de notícias deste site e as redes sociais do CIM, alcançando estudantes, profissionais de saúde e a população em geral. O objetivo é combater a desinformação, aproximar a ciência do cotidiano das pessoas e desenvolver nos extensionistas habilidades de comunicação em saúde, escrita e leitura crítica de evidências.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'sensibiliza-cim',
    name: 'SENSIBILIZA CIM',
    theme: 'Resistência aos antimicrobianos',
    logo: '/projetos/sensibiliza-cim.png',
    summary: [
      'A resistência aos antimicrobianos (RAM) é um problema de saúde pública mundial: estima-se que, até 2050, ela possa ser responsável por cerca de 10 milhões de mortes por ano. O cenário se agrava com o uso indiscriminado desses medicamentos e com o descompasso entre o surgimento de bactérias resistentes e o desenvolvimento de novos tratamentos.',
      'Diante disso, o SENSIBILIZA CIM, projeto de extensão da UFPB, busca sensibilizar uma nova geração sobre esse desafio e estimular que a população e os profissionais de saúde reconheçam o fenômeno no seu próprio contexto. O projeto realiza ações presenciais com pacientes e profissionais em João Pessoa, como a atividade na USF São Rafael, e promove na UFPB um encontro anual em alusão à Semana Mundial de Conscientização sobre a Resistência aos Antimicrobianos, a primeira iniciativa institucional do tipo na universidade.',
      'Com essas ações, o projeto fortalece o engajamento entre universidade, unidades de saúde e comunidade, criando redes locais de enfrentamento à RAM.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'vacina-cim',
    name: 'VACINA CIM',
    theme: 'Imunização',
    logo: '/projetos/vacina-cim.png',
    summary: [
      'O VACINA CIM é o projeto de extensão do CIM-UFPB dedicado à educação em saúde sobre imunização. As vacinas estão entre as ferramentas mais eficazes da saúde pública, mas a queda nas coberturas vacinais e a circulação de informações falsas colocam em risco conquistas importantes, como a eliminação de doenças que voltaram a preocupar o país.',
      'Os extensionistas transformam evidências científicas em conteúdos e ações acessíveis sobre o funcionamento das vacinas, o calendário de vacinação em cada fase da vida, a segurança dos imunizantes e os mitos mais comuns. As atividades acontecem em Unidades de Saúde da Família, escolas e espaços da comunidade, com rodas de conversa, materiais educativos e dinâmicas que acolhem dúvidas e receios sem julgamento.',
      'Pelo site e pelo Instagram, o projeto amplia seu alcance para a população em geral, estudantes e profissionais de saúde. O objetivo é fortalecer a confiança nas vacinas, combater a desinformação e contribuir para a ampliação das coberturas vacinais, aproximando a universidade das necessidades da comunidade.',
    ],
    instagram: [CIM_IG],
  },
  {
    slug: 'vet-cim',
    name: 'VET CIM',
    theme: 'Medicamentos em animais de companhia',
    logo: '/projetos/vet-cim.png',
    summary: [
      'O VetCIM é o projeto de extensão do CIM-UFPB voltado à promoção do uso racional de medicamentos em animais de companhia. A iniciativa busca conscientizar tutores, estudantes do ensino médio e a comunidade em geral sobre os riscos da automedicação veterinária, do uso inadequado de medicamentos humanos e animais e da reutilização de prescrições.',
      'As ações acontecem em clínica veterinária parceira, como a Ultra Vet, em escola pública, em praças, como a praça das Três Ruas, nos Bancários, e nas redes sociais, por meio de oficinas, rodas de conversa, campanhas educativas, cartilhas, vídeos e conteúdos digitais. O projeto também estimula a farmacovigilância veterinária e a prevenção de intoxicações e da resistência antimicrobiana.',
      'De forma interdisciplinar, o VetCIM integra estudantes de Farmácia, Medicina Veterinária e outras áreas da saúde, fortalecendo a formação acadêmica e a comunicação em saúde. Assim, promove a troca de saberes entre universidade e comunidade, contribuindo para o cuidado responsável, o bem-estar animal e a Saúde Única.',
    ],
    instagram: [CIM_IG],
  },
];

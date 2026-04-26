import type { LucideIcon } from 'lucide-react';
import { BadgeCheck, CheckCircle, Clock, Trees } from 'lucide-react';

export type CaseStudy = {
  slug: string;
  title: {
    es: string;
    en: string;
  };
  client: {
    es: string;
    en: string;
  };
  industry: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  image: {
    src: string;
    alt: {
      es: string;
      en: string;
    };
  };
  metrics: Array<{
    label: {
      es: string;
      en: string;
    };
    value: string;
    icon: LucideIcon;
  }>;
  challenge: {
    es: string;
    en: string;
  };
  solution: {
    es: string;
    en: string;
  };
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'teleflex-inspeccion-kits-medicos',
    title: {
      es: 'Inspección automática de kits médicos',
      en: 'Automated medical kit inspection',
    },
    client: {
      es: 'Teleflex',
      en: 'Teleflex',
    },
    industry: {
      es: 'Dispositivos médicos',
      en: 'Medical devices',
    },
    description: {
      es: 'Reducción del 94% en errores de ensamblaje mediante visión artificial en tiempo real.',
      en: '94% reduction in assembly errors through real-time computer vision.',
    },
    image: {
      src: '/collaboration/teleflex-info.webp',
      alt: {
        es: 'Operario de Teleflex inspeccionando kits médicos con visión artificial en tiempo real',
        en: 'Teleflex operator inspecting medical kits with real-time computer vision',
      },
    },
    metrics: [
      {
        label: {
          es: 'Reducción de errores',
          en: 'Error reduction',
        },
        value: '94%',
        icon: CheckCircle,
      },
    ],
    challenge: {
      es: 'La operación requería validar componentes de kits médicos en línea sin aumentar tiempos de ciclo ni depender de inspección manual al final del proceso.',
      en: 'The operation needed to validate medical kit components in-line without increasing cycle times or relying on manual end-of-line inspection.',
    },
    solution: {
      es: 'IINIA desplegó visión artificial en tiempo real con captura controlada, modelos de detección y alertas para operadores antes de liberar cada kit.',
      en: 'IINIA deployed real-time computer vision with controlled capture, detection models, and operator alerts before each kit was released.',
    },
    stack: ['Computer Vision', 'Edge AI', 'NVIDIA', 'Quality Inspection'],
  },
  {
    slug: 'hubbell-seguridad-loto',
    title: {
      es: 'Seguridad operativa con LOTO',
      en: 'Operational safety with LOTO',
    },
    client: {
      es: 'Hubbell',
      en: 'Hubbell',
    },
    industry: {
      es: 'Manufactura industrial',
      en: 'Industrial manufacturing',
    },
    description: {
      es: 'Sistema de verificación automática de bloqueo/etiquetado que asegura cumplimiento del 95%.',
      en: 'Automated lockout/tagout verification system ensuring 95% compliance.',
    },
    image: {
      src: '/collaboration/hubbell-info.webp',
      alt: {
        es: 'Especialista de Hubbell verificando procedimientos LOTO desde una consola digital',
        en: 'Hubbell specialist validating LOTO procedures from a digital console',
      },
    },
    metrics: [
      {
        label: {
          es: 'Cumplimiento LOTO',
          en: 'LOTO compliance',
        },
        value: '95%',
        icon: BadgeCheck,
      },
    ],
    challenge: {
      es: 'El equipo necesitaba reforzar cumplimiento LOTO con verificación objetiva y trazabilidad operativa para reducir exposición a riesgos.',
      en: 'The team needed to reinforce LOTO compliance with objective verification and operational traceability to reduce risk exposure.',
    },
    solution: {
      es: 'Se integró un flujo de validación con visión, reglas de cumplimiento y evidencia digital para supervisar puntos críticos del procedimiento.',
      en: 'A validation workflow combined vision, compliance rules, and digital evidence to supervise critical procedure checkpoints.',
    },
    stack: ['Safety AI', 'Computer Vision', 'Workflow Automation', 'Compliance'],
  },
  {
    slug: 'juarez-limpio-deteccion-urbana',
    title: {
      es: 'Detección urbana inteligente',
      en: 'Intelligent urban detection',
    },
    client: {
      es: 'Juárez Limpio',
      en: 'Juárez Limpio',
    },
    industry: {
      es: 'Gestión urbana',
      en: 'Urban management',
    },
    description: {
      es: 'Mapeo automático de 434k árboles y planificación urbana con IA para optimización de recursos.',
      en: 'Automated mapping of 434k trees and AI-driven urban planning for resource optimization.',
    },
    image: {
      src: '/collaboration/juarez-limpio-info.webp',
      alt: {
        es: 'Visualización aérea de Ciudad Juárez con árboles identificados por inteligencia artificial',
        en: 'Aerial visualization of Ciudad Juárez with trees identified by artificial intelligence',
      },
    },
    metrics: [
      {
        label: {
          es: 'Árboles mapeados',
          en: 'Trees mapped',
        },
        value: '434k',
        icon: Trees,
      },
    ],
    challenge: {
      es: 'La planeación urbana requería inventarios confiables de activos verdes a escala ciudad para priorizar mantenimiento y asignación de recursos.',
      en: 'Urban planning required reliable city-scale green asset inventories to prioritize maintenance and resource allocation.',
    },
    solution: {
      es: 'Se aplicaron modelos de detección sobre imágenes geoespaciales para mapear árboles, consolidar métricas y habilitar decisiones operativas.',
      en: 'Detection models were applied to geospatial imagery to map trees, consolidate metrics, and enable operational decisions.',
    },
    stack: ['Geospatial AI', 'Object Detection', 'Urban Analytics', 'Data Visualization'],
  },
  {
    slug: 'space-automatizacion-documental',
    title: {
      es: 'Automatización documental',
      en: 'Document automation',
    },
    client: {
      es: 'SPACE',
      en: 'SPACE',
    },
    industry: {
      es: 'Servicios administrativos',
      en: 'Administrative services',
    },
    description: {
      es: 'Procesamiento inteligente de documentos que ahorra más de 120 horas mensuales en gestión administrativa.',
      en: 'Intelligent document processing saving 120+ hours of administrative work each month.',
    },
    image: {
      src: '/collaboration/space-ocr.webp',
      alt: {
        es: 'Panel de automatización documental de SPACE mostrando validaciones OCR',
        en: 'SPACE document automation dashboard showing OCR validations',
      },
    },
    metrics: [
      {
        label: {
          es: 'Horas ahorradas / mes',
          en: 'Hours saved / month',
        },
        value: '120+',
        icon: Clock,
      },
    ],
    challenge: {
      es: 'Procesos administrativos consumían horas en captura, revisión y validación de documentos repetitivos con alta variabilidad de formatos.',
      en: 'Administrative processes consumed hours in repetitive document capture, review, and validation across highly variable formats.',
    },
    solution: {
      es: 'IINIA implementó extracción OCR, validaciones automáticas y flujo de revisión para acelerar gestión documental y reducir retrabajo.',
      en: 'IINIA implemented OCR extraction, automated validations, and review workflows to speed up document management and reduce rework.',
    },
    stack: ['OCR', 'Document AI', 'Workflow Automation', 'Validation Rules'],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug) || null;
}

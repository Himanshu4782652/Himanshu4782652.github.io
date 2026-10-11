import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        # Header (on pages > 1)
        if self._pageNumber > 1:
            self.drawString(36, 11 * inch - 26, "Himanshu Srivastav — Software Developer (FastAPI, Django & Deep Learning)")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(36, 11 * inch - 30, 8.5 * inch - 36, 11 * inch - 30)
        # Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 36, 22, footer_text)
        self.drawString(36, 22, "Confidential — himanshu4782652.github.io")
        self.restoreState()

def build_pdf(filename):
    # Margins: 0.45 in (32.4 pt)
    margin = 32.4
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=36,
        bottomMargin=34
    )

    styles = getSampleStyleSheet()

    # Color Palette
    PRIMARY = colors.HexColor("#0f172a")    # Deep slate
    ACCENT = colors.HexColor("#0369a1")     # Deep cerulean / cyan-blue
    TEXT = colors.HexColor("#1e293b")       # Dark charcoal text
    MUTED = colors.HexColor("#475569")      # Slate muted text
    RULE_COLOR = colors.HexColor("#cbd5e1") # Divider line

    name_style = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        textColor=PRIMARY,
        alignment=TA_CENTER
    )

    target_titles_style = ParagraphStyle(
        'TargetTitles',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=ACCENT,
        alignment=TA_CENTER,
        spaceAfter=2
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=5
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=PRIMARY,
        spaceBefore=7,
        spaceAfter=2
    )

    sub_section_heading_style = ParagraphStyle(
        'SubSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=ACCENT,
        spaceBefore=4,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11,
        textColor=TEXT,
        alignment=TA_JUSTIFY,
        spaceAfter=3
    )

    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=12,
        textColor=PRIMARY
    )

    job_meta_style = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=ACCENT,
        alignment=TA_RIGHT
    )

    job_sub_style = ParagraphStyle(
        'JobSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.2,
        leading=11,
        textColor=MUTED
    )

    bullet_style = ParagraphStyle(
        'BulletItem',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.1,
        leading=10.8,
        textColor=TEXT,
        alignment=TA_LEFT,
        leftIndent=11,
        firstLineIndent=-11,
        spaceAfter=2.5
    )

    metric_title_style = ParagraphStyle(
        'MetricTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.5,
        textColor=PRIMARY
    )

    metric_val_style = ParagraphStyle(
        'MetricVal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.5,
        textColor=TEXT
    )

    def section_rule():
        return HRFlowable(width="100%", thickness=1, color=RULE_COLOR, spaceBefore=2, spaceAfter=4)

    def sub_rule():
        return HRFlowable(width="100%", thickness=0.4, color=colors.HexColor("#e2e8f0"), spaceBefore=1, spaceAfter=3)

    story = []

    # 1. HEADER
    story.append(Paragraph("HIMANSHU SRIVASTAV", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Software Developer &nbsp;|&nbsp; Software Development Engineer (SDE) &nbsp;|&nbsp; Backend & AI Engineer", target_titles_style))
    contact_line = (
        'Ujjain, Madhya Pradesh, India &nbsp;&bull;&nbsp; '
        '+91 98357 62937 &nbsp;&bull;&nbsp; '
        '<a href="mailto:himanshusriwastava111@gmail.com"><font color="#0369a1">himanshusriwastava111@gmail.com</font></a> &nbsp;&bull;&nbsp; '
        '<a href="https://linkedin.com/in/himanshu-srivastav-dev"><font color="#0369a1">linkedin.com/in/himanshu-srivastav-dev</font></a> &nbsp;&bull;&nbsp; '
        '<a href="https://github.com/Himanshu4782652"><font color="#0369a1">github.com/Himanshu4782652</font></a> &nbsp;&bull;&nbsp; '
        '<a href="https://himanshu4782652.github.io"><font color="#0369a1">himanshu4782652.github.io</font></a>'
    )
    story.append(Paragraph(contact_line, contact_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceBefore=2, spaceAfter=5))

    # 2. EXECUTIVE SUMMARY
    story.append(Paragraph("EXECUTIVE SUMMARY", section_heading_style))
    story.append(section_rule())
    summary_text = (
        "<b>Software Developer / Software Development Engineer (SDE)</b> with 2+ years of production experience building high-concurrency "
        "async backends (<b>FastAPI, Django, PostgreSQL 18, Redis, Celery</b>) and production deep learning / computer vision microservices "
        "(<b>RF-DETR, Detectron2, ResUNet, Geospatial AI</b>). Track record of shipping <b>8+ enterprise production applications</b> end-to-end, "
        "executing zero-downtime database migrations (<b>5.08M+ rows</b>), and architecting standardized <b>Deep Learning Bundles (DLBs)</b>. "
        "Experienced in fine-tuning on high-resolution aerial and orbital imagery (<b>USDA NAIP, Sentinel-1/2, ISRO LISS-4</b>), optimizing hardware throughput "
        "on <b>NVIDIA Ada Lovelace GPUs</b> (bfloat16 AMP), and building deterministic payload-driven inference services with automated GIS vectorization."
    )
    story.append(Paragraph(summary_text, body_style))

    # 3. CORE TECHNICAL SKILLS MATRIX
    story.append(Paragraph("CORE TECHNICAL SKILLS MATRIX", section_heading_style))
    story.append(section_rule())

    skills_data = [
        [
            Paragraph("<b>Backend & Web Frameworks:</b>", metric_title_style),
            Paragraph("FastAPI, Django, Django REST Framework (DRF), Flask, adrf, Celery, Redis, SQLAlchemy 2.x async, aiomysql, WebSockets, Daphne / ASGI, Uvicorn, RESTful API Design, Microservices.", metric_val_style)
        ],
        [
            Paragraph("<b>Databases & Systems:</b>", metric_title_style),
            Paragraph("PostgreSQL 18, MySQL, SQLite, Qdrant Vector DB, OpenSearch, Alembic, multi-tenant DB routing, N+1 query elimination, pgloader zero-downtime migrations (5.08M rows).", metric_val_style)
        ],
        [
            Paragraph("<b>Computer Vision & DL:</b>", metric_title_style),
            Paragraph("RF-DETR (Lightweight DETR + DINOv2 ViT Backbone), Detectron2, Mask R-CNN, Faster R-CNN, FCN8, ResUNet-4B, Hungarian Bipartite Loss, Soft Dice Loss, Transfer Learning, Anchor Optimization, SAM, Grounding-DINO, DeepFace.", metric_val_style)
        ],
        [
            Paragraph("<b>Geospatial & Remote Sensing:</b>", metric_title_style),
            Paragraph("Rasterio, Shapely, GeoPandas, GDAL, Multi-spectral/SAR (Sentinel-1 SAR, Sentinel-2 Optical, USDA NAIP 0.6m–1.0m, ISRO LISS-4 5.0m), GeoTIFF, Orthorectification, Cross-Tile NMS, Sliding-Window Tiling, Hanning-blend, NDVI, STAC.", metric_val_style)
        ],
        [
            Paragraph("<b>Cloud, MLOps & Hardware:</b>", metric_title_style),
            Paragraph("AWS (EKS, S3, EFS), Docker containerization, Linux (WSL2 / Ubuntu), mixed-precision computing (bfloat16 / FP16 AMP), NVIDIA RTX 5000 Ada (Ada Lovelace), Snowflake / Fabric DB syncing, automated test suites (pytest).", metric_val_style)
        ]
    ]

    skills_table = Table(skills_data, colWidths=[1.8 * inch, 5.65 * inch])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)

    # 4. WORK EXPERIENCE
    story.append(Spacer(1, 3))
    story.append(Paragraph("WORK EXPERIENCE", section_heading_style))
    story.append(section_rule())

    # GJ Maps Solutions
    head_data_1 = [
        [
            Paragraph("<b>Python Deep Learning Developer & Computer Vision Engineer</b><br/><font color='#475569'>GJ Maps Solutions Pvt. Ltd. | Udaipur, Rajasthan</font>", job_title_style),
            Paragraph("June 2026 – Present", job_meta_style)
        ]
    ]
    t1 = Table(head_data_1, colWidths=[5.45 * inch, 2.0 * inch])
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t1)

    story.append(Paragraph("Geospatial AI, Satellite Observation & Cadastral Mapping", sub_section_heading_style))
    story.append(Paragraph("&bull; Built a continental agricultural field delineation pipeline with <b>Detectron2 Mask R-CNN (ResNet-50-FPN)</b> on 1.0m USDA NAIP aerial orthophotography, achieving <b>68.84% Mask AP₅₀</b> across 10,178 image chips and 4.8M vector annotations.", bullet_style))
    story.append(Paragraph("&bull; Architected a 5.0m satellite cadastral parcel delineation engine for smallholder agricultural layouts across India (ISRO LISS-4 4-band rasters); custom-tuned Region Proposal Network (RPN) anchors (<code>[[12], [24], [48], [96], [192]]</code>) to capture smallholder plots (&lt; 1 ha).", bullet_style))
    story.append(Paragraph("&bull; Trained the India delineation model for <b>50,609 iterations (30 epochs)</b> using bfloat16 AMP on an NVIDIA RTX 5000 Ada (32GB VRAM), maintaining a steady ~3.8GB memory footprint and high training throughput (~3.2 batches/sec).", bullet_style))
    story.append(Paragraph("&bull; Developed an end-to-end sliding-window inference pipeline (512×512 tiles, 64px overlap) with cross-tile spatial NMS deduplication, delineating <b>2,589 farm parcels in 15.5 seconds</b> on a full-scene GeoTIFF and exporting topologically valid vector polygons (GeoJSON) with dynamic acreage computation.", bullet_style))
    story.append(Paragraph("&bull; Engineered a 4-band <b>ResUNet-4B</b> semantic boundary segmenter with Compound Boundary Loss (Boundary-weighted Cross-Entropy + Multiclass Soft Dice Loss), dynamic range normalization, and 2D Hanning-window blend reconstruction to eliminate tile seam artifacts.", bullet_style))

    story.append(Paragraph("Vision Transformers & Real-Time Object Detection (RF-DETR)", sub_section_heading_style))
    story.append(Paragraph("&bull; Modernized privacy compliance and asset-tracking pipelines from legacy Faster R-CNN and YOLO models to <b>RF-DETR Medium (33.4M params, DINOv2 backbone)</b>, reducing inference latency while boosting localization accuracy.", bullet_style))
    story.append(Paragraph("&bull; Built a unified multi-domain dataset of <b>37,830 images and 45,716 annotations</b> by aggregating Kaggle, Hugging Face, and 2,078 real-world street scenes from Goa, India; achieved <b>&gt;97% mAP@50</b> and <b>72.1% strict mAP@50:95</b>.", bullet_style))
    story.append(Paragraph("&bull; Fine-tuned RF-DETR for turbine blade defect identification (DTU Nordtank dataset), reaching <b>87.30% mAP@50</b> and an <b>85.77% F1 score</b> across surface pollution (<i>Dirt</i>) and structural fissures (<i>Damage</i>).", bullet_style))
    story.append(Paragraph("&bull; Trained maritime vessel detection models on SAR satellite imagery (LS-SSDD), achieving <b>59.24% mAP@50</b> and <b>75.0% precision</b>; diagnosed training telemetry to halt execution at peak convergence (Epoch 13), preventing severe validation overfitting.", bullet_style))
    story.append(Paragraph("&bull; Solved deep learning edge cases, including DETR zero-indexed foreground classification mappings, CPU-only worker fallback fixes, and spatial GSD mismatches between high-resolution sensors and orbital backbones.", bullet_style))

    story.append(Paragraph("Enterprise DL Platform Engineering & MLOps Infrastructure", sub_section_heading_style))
    story.append(Paragraph("&bull; Designed and deployed standardized <b>Deep Learning Bundles (DLBs)</b> containing deterministic runtime specifications (<code>metadata.json</code>), catalog schemas (<code>data.json</code>), and isolated execution engines (<code>inference/main.py</code>).", bullet_style))
    story.append(Paragraph("&bull; Eliminated silent runtime failures by replacing mock fallbacks with strict fail-loud exception contracts and non-blocking job progress reporting (<code>update_job_status</code>) compatible with distributed cloud worker pods.", bullet_style))
    story.append(Paragraph("&bull; Built a dual-mode execution interface supporting platform task payloads (with EFS/POSIX path normalization) and standalone CLI debugging.", bullet_style))
    story.append(Paragraph("&bull; Developed custom CLI packaging utilities (<code>create_dlb.py</code>) that bundle production weights while filtering out intermediate training checkpoints (<code>.ckpt</code>), caching layers, and database manifests.", bullet_style))
    story.append(Paragraph("&bull; Coordinated database synchronization between primary catalog databases (Snowflake/Fabric) and regional inference queues (Pulse DB), managing automated artifact deployment to AWS S3.", bullet_style))

    # MR Softwares
    story.append(Spacer(1, 4))
    head_data_2 = [
        [
            Paragraph("<b>Python Full Stack Developer</b><br/><font color='#475569'>MR Softwares | Ujjain, MP</font>", job_title_style),
            Paragraph("May 2025 – June 2026", job_meta_style)
        ]
    ]
    t2 = Table(head_data_2, colWidths=[5.45 * inch, 2.0 * inch])
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t2)

    story.append(Paragraph("&bull; Designed, built, and shipped 8 production applications end-to-end (from database schema and API design to Docker containerization, Nginx SSL, CI/CD pipelines, and cloud deployment) serving enterprise clients independently.", bullet_style))
    story.append(Paragraph("&bull; <b>eSchool Biometric & AI Attendance:</b> Led full framework migration from Django+DRF to FastAPI async with aiomysql + SQLAlchemy async connection pooling in 18 working days with zero downtime; integrated DeepFace FaceNet embeddings, sub-second Qdrant cosine matching, and Silent-Face Anti-Spoofing (MiniFASNetV2 PyTorch) liveness gate.", bullet_style))
    story.append(Paragraph("&bull; <b>WaahApp (WhatsApp Business SaaS):</b> Led solo MySQL to PostgreSQL 18 + Azure to OCI migration of 5.08M rows with zero data loss in 2h 15m window; tuned PostgreSQL shared_buffers and indexes to slash API latency to sub-second responses.", bullet_style))
    story.append(Paragraph("&bull; <b>Avvyx & LatLong:</b> Architected B2B SaaS PPF warranty system (FastAPI, SQLAlchemy 2.x, programmatic A4 PDFs) and real-time GPS tracking microservice (Django Channels, Traccar GPS, OpenSearch, geopy geodesic proximity alerts).", bullet_style))
    story.append(Paragraph("&bull; <b>Hardware & Scraping:</b> Built multi-court scraping engine (6+ High Courts, Playwright/Selenium, Azure Functions) and PyQt6 desktop hotel management system with physical RFID card writers via pyserial.", bullet_style))

    # Internships
    story.append(Spacer(1, 3))
    head_data_3 = [
        [
            Paragraph("<b>Python Developer Intern</b> &nbsp;|&nbsp; <font color='#475569'>CodeAlpha (Remote: Oct 2023 – Jan 2024)</font> &nbsp;&bull;&nbsp; <b>Software Engineer Intern</b> &nbsp;|&nbsp; <font color='#475569'>Oasis Infobyte (Apr 2023 – May 2023)</font>", body_style),
            Paragraph("", job_meta_style)
        ]
    ]
    t3 = Table(head_data_3, colWidths=[7.45 * inch, 0.0 * inch])
    t3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t3)

    # 5. KEY PROJECT DEEP DIVES
    story.append(Spacer(1, 4))
    story.append(Paragraph("PROJECT DEEP DIVES", section_heading_style))
    story.append(section_rule())

    proj_1 = (
        "<b>1. Enterprise Deep Learning Bundle (DLB) Engine & Microservices Platform:</b> "
        "Engineered core DL runtime integration for XenTerra Pulse, replacing heterogeneous scripts with modular, container-ready bundles. "
        "Standardized runtime contracts across object detection, pixel classification, and instance segmentation. Solved platform hanging bugs via resilient "
        "try-except telemetry decoupled from inference loops; validated production packages with automated pytest suites."
    )
    story.append(Paragraph(proj_1, bullet_style))

    proj_2 = (
        "<b>2. Multi-Continental Agricultural Field Delineation (Detectron2 Mask R-CNN & ResUNet):</b> "
        "Created instance & semantic boundary segmentation framework spanning USA (USDA NAIP 1.0m GSD; 68.84% AP₅₀ on 512×512 tiles with 64px overlap), "
        "Europe (Copernicus Sentinel-2 10.0m GSD), and India (ISRO LISS-4 5.0m GSD). Deployed 4-band ResUNet-4B with dynamic NDVI and Mask R-CNN with anchor tuning "
        "for smallholder farms; delivered full-scene georeferenced raster masks and WGS84 GeoJSON polygons."
    )
    story.append(Paragraph(proj_2, bullet_style))

    proj_3 = (
        "<b>3. Edge & Aerial Surveillance via RF-DETR Vision Transformers:</b> "
        "Upgraded legacy CNN pipelines to Meta DINOv2-backed Detection Transformers across three critical domains: "
        "(a) <i>License Plate Anonymization:</i> Multi-threaded S3 ingestion, Grounding-DINO labels, joint training on 37.8k images (97.64% mAP@50), and Gaussian blurring; "
        "(b) <i>Windmill Defects:</i> Drone inspection data with Hungarian loss matching on RTX 5000 Ada (87.30% mAP@50); "
        "(c) <i>Maritime SAR Ship Detection:</i> Fine-tuned RF-DETR Medium on SAR GeoTIFFs (59.24% mAP@50, 75.0% precision, sub-2px box localization)."
    )
    story.append(Paragraph(proj_3, bullet_style))

    proj_4 = (
        "<b>4. Renewable Energy Mapping & Planetary Model Standardization:</b> "
        "Packaged research foundation models (Microsoft Global Renewables Watch FCN8 ResNet-50) into production DLBs with inlined inference, "
        "radiometric normalization, and spatial resolution scale calibration. Formulated dataset ingestion pipelines for road surface defects, "
        "urban asset tracking (Ashok Nagar & Udaipur), Microsoft Solar Farms, and NASA-IBM Prithvi foundation models (Burn Area, Flood, Crop ID)."
    )
    story.append(Paragraph(proj_4, bullet_style))

    # 6. KEY METRICS SUMMARY
    story.append(Spacer(1, 4))
    story.append(Paragraph("KEY METRICS SUMMARY", section_heading_style))
    story.append(section_rule())

    metrics_table_data = [
        [
            Paragraph("<b>Dataset Scale:</b>", metric_title_style),
            Paragraph("37,830 images / 45,716 annotations (License Plates); 10,178 chips / 4.8M vectors (USA Agriculture); 146k instances (India Agriculture); 2,995 drone frames (Windmill Defects).", metric_val_style)
        ],
        [
            Paragraph("<b>Model Accuracy:</b>", metric_title_style),
            Paragraph("<b>License Plate:</b> 97.64% mAP@50, 72.13% strict mAP@50:95 &nbsp;|&nbsp; <b>Windmill Blade Defects:</b> 87.30% mAP@50, 85.77% F1 score<br/><b>Agricultural Delineation (USA):</b> 68.84% Mask AP₅₀, 70.24% Box AP₅₀ &nbsp;|&nbsp; <b>Maritime Ship:</b> 59.24% mAP@50, 75.00% Precision", metric_val_style)
        ],
        [
            Paragraph("<b>System Performance:</b>", metric_title_style),
            Paragraph("Full-scene satellite parcel delineation (Dharwad AOI 32) completed in <b>15.5 seconds (~20 FPS)</b> on RTX 5000 Ada, outputting <b>2,589 deduplicated parcels</b>.", metric_val_style)
        ],
        [
            Paragraph("<b>Memory & Footprint:</b>", metric_title_style),
            Paragraph("Steady <b>~3.8GB VRAM</b> footprint during large-scale instance segmentation training using bfloat16 AMP. Average production <code>.dlb</code> bundle sizes maintained between <b>83 MB and 156 MB</b>.", metric_val_style)
        ]
    ]

    m_table = Table(metrics_table_data, colWidths=[1.5 * inch, 5.95 * inch])
    m_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(m_table)

    # 7. EDUCATION & CERTIFICATIONS
    story.append(Spacer(1, 4))
    story.append(Paragraph("EDUCATION & CERTIFICATIONS", section_heading_style))
    story.append(section_rule())

    edu_cert_data = [
        [
            Paragraph("<b>B.Tech in Computer Science & Information Technology</b><br/><font color='#475569'>IES IPS Academy, Indore, MP | 2021 – 2025 | GPA: 7.50 / 10</font>", metric_val_style),
            Paragraph("<b>Python Developer Associate (PDAC-24)</b> — ITechCert / AICERT (Jul 2024)<br/><b>Computer Vision Builder</b> — IIT Delhi (FITT / MP-IITD) (Mar 2024)", metric_val_style)
        ]
    ]
    ec_table = Table(edu_cert_data, colWidths=[3.7 * inch, 3.75 * inch])
    ec_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(ec_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {filename}")

if __name__ == '__main__':
    output_pdf = os.path.abspath('assets/Himanshu_Srivastav_Resume.pdf')
    build_pdf(output_pdf)

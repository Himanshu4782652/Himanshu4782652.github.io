# 🌟 Himanshu Srivastav — Software Developer (FastAPI, Django & Deep Learning)

[![Live Demo](https://img.shields.io/badge/Live-Portfolio-00ffaa?style=for-the-badge&logo=firefox-browser)](https://himanshu4782652.github.io)
[![Web Resume](https://img.shields.io/badge/Web-Resume-00f2fe?style=for-the-badge&logo=adobe-acrobat-reader)](https://himanshu4782652.github.io/resume.html)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://himanshu4782652.github.io)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> **Software Developer / Software Development Engineer (SDE)** specializing in high-concurrency backends (**FastAPI, Django, PostgreSQL 18, Redis, Celery**), zero-downtime database migrations, and production Deep Learning / Computer Vision microservices (**RF-DETR, Detectron2, Geospatial AI**).

---

## 🎯 Target Titles & Role Framing

* **Software Developer**
* **Software Development Engineer (SDE)**
* **Backend & AI Systems Engineer (FastAPI & Django)**

---

## 💡 Executive Summary

Software Developer / Software Development Engineer (SDE) with 2+ years of production experience building high-concurrency async backends (FastAPI, Django, PostgreSQL 18, Redis, Celery) and production deep learning / computer vision microservices (RF-DETR, Detectron2, ResUNet, Geospatial AI). Proven track record of independently designing, building, and deploying 8+ enterprise production applications, executing zero-downtime database migrations (5.08M+ rows), and architecting standardized Deep Learning Bundles (DLBs). Experienced in fine-tuning on high-resolution aerial and orbital imagery (USDA NAIP, Sentinel-1/2, ISRO LISS-4), optimizing hardware throughput on NVIDIA Ada Lovelace GPUs (bfloat16 AMP), and building deterministic payload-driven inference services with automated GIS vectorization.

---

## 🛠️ Core Technical Skills Matrix

* **Computer Vision & Deep Learning:** RF-DETR (Lightweight DETR + DINOv2 ViT Backbone), Detectron2, Mask R-CNN, Faster R-CNN, FCN8, ResUNet-4B, Hungarian Bipartite Loss, Soft Dice Loss, Transfer Learning, Anchor Optimization, Segment Anything (SAM), Grounding-DINO.
* **Geospatial & Remote Sensing:** Rasterio, Shapely, GeoPandas, GDAL, Multi-spectral/SAR Ingestion (Sentinel-1 SAR, Sentinel-2 Optical, USDA NAIP 0.6m–1.0m, ISRO Resourcesat-2 LISS-4 5.0m), GeoTIFF processing, Orthorectification, Cross-Tile Non-Maximum Suppression (NMS), Sliding-Window Tiling, Hanning-window blend reconstruction, NDVI computation, EPSG/WGS84 re-projections.
* **Frameworks & Languages:** Python 3.10+, PyTorch, PyTorch Lightning, TorchVision, Albumentations, Supervision, OpenCV, NumPy, SciPy, FastAPI, Django, Flask, SQLAlchemy async, aiomysql.
* **MLOps, Cloud & Systems:** AWS S3, AWS EFS, AWS EKS (Kubernetes), Docker containerization, Linux (WSL2 / Ubuntu), mixed-precision computing (bfloat16/FP16 AMP), NVIDIA RTX 5000 Ada (Ada Lovelace), PostgreSQL 18, Snowflake/Fabric DB syncing, automated test suites (pytest), Redis, Qdrant Vector DB.

---

## 🚀 Key Metrics Summary

* **Dataset Scale:** 37,830 images / 45,716 annotations (License Plates); 10,178 chips / 4.8M vectors (USA Agriculture); 146k instances (India Agriculture); 2,995 drone frames (Windmill Defects).
* **Model Accuracy:**
  * License Plate Detection: **97.64% mAP@50**, **72.13% strict mAP@50:95**.
  * Windmill Blade Defects: **87.30% mAP@50**, **85.77% F1 score**.
  * Agricultural Delineation (USA NAIP): **68.84% Mask AP₅₀**, **70.24% Box AP₅₀**.
  * Maritime Ship Detection: **59.24% mAP@50**, **75.00% Precision**.
* **System Performance:** Full-scene satellite parcel delineation (Dharwad AOI 32) completed in **15.5 seconds** (**~20 FPS** on RTX 5000 Ada), outputting 2,589 deduplicated parcels.
* **Memory & Storage Footprint:**
  * Stable **~3.8GB VRAM** footprint during large-scale instance segmentation training using bfloat16 AMP.
  * Average production `.dlb` bundle sizes maintained between **83 MB and 156 MB**.

---

## 💼 Project Deep Dives

### 1. Enterprise Deep Learning Bundle (DLB) Engine & Microservices Platform
* Standardized runtime contracts (`metadata.json`, `data.json`, `inference/main.py`) across object detection, pixel classification, and instance segmentation.
* Built dual-mode execution interface supporting platform task payloads (with EFS/POSIX path normalization) and CLI debugging.
* Developed custom CLI packaging utilities (`create_dlb.py`) and automated catalog sync with Snowflake, Fabric DB, and AWS S3.

### 2. Multi-Continental Agricultural Field Delineation (Detectron2 & ResUNet)
* **USA Pipeline:** USDA NAIP 1.0m orthophotography with Detectron2 Mask R-CNN (ResNet-50-FPN; 68.84% Mask AP₅₀ across 10,178 chips & 4.8M vector annotations).
* **Europe Pipeline:** Copernicus Sentinel-2 Level-2A (10.0m GSD) sliding-window cadastral mapping.
* **India 5m Pipeline:** ISRO Resourcesat-2 LISS-4 imagery; 4-band ResUNet-4B with automated NDVI and tuned Detectron2 RPN anchors (`[[12], [24], [48], [96], [192]]`) for smallholder farms (< 1 ha). Delineated 2,589 farm parcels in 15.5 seconds on a full-scene GeoTIFF.

### 3. Edge & Aerial Surveillance via RF-DETR Vision Transformers
* Upgraded legacy CNN computer vision pipelines to Meta DINOv2-backed Detection Transformers (RF-DETR Medium, 33.4M params).
* **Vehicle Privacy:** 37,830 images / 45,716 annotations (>97% mAP@50, 72.1% strict mAP@50:95).
* **Windmill Defect Inspection:** DTU Nordtank dataset with Hungarian bipartite loss on RTX 5000 Ada (87.30% mAP@50, 85.77% F1).
* **SAR Ship Detection:** LS-SSDD multi-band SAR GeoTIFFs (59.24% mAP@50, 75.0% precision).

### 4. Renewable Energy Mapping & Planetary Model Standardization
* Packaged Microsoft Global Renewables Watch (GRW) FCN8 ResNet-50 into production DLBs with inlined inference and radiometric normalization.
* Engineered dataset ingestion pipelines for road surface defects, vehicle-mounted urban asset tracking, Microsoft Solar Farms, and NASA-IBM Prithvi foundation models (Burn Area, Flood, Crop ID).

---

## 📁 Repository Structure

```
├── index.html                  # Cyber geospatial dark theme portfolio
├── resume.html                 # Interactive ATS-compliant web resume (with Print CSS)
├── style.css                   # Cyber HUD styles, telemetry cards, and animations
├── app.js                      # Three.js 3D plexus scene & 3D rotating skills globe
├── generate_resume.py          # Python ReportLab compilation script for official PDF resume
├── assets/
│   ├── Himanshu_Srivastav_Resume.pdf  # Compiled ATS-compliant official resume
│   ├── resume.pdf                     # Mirror copy of official resume
│   ├── xenterra_fabric_placeholder.png
│   └── xenterra_pulse_placeholder.png
└── README.md                   # Repository documentation
```

---

## 🌐 Connect With Me

* **📧 Email:** [himanshusriwastava111@gmail.com](mailto:himanshusriwastava111@gmail.com)
* **📱 Phone:** [+91 98357 62937](tel:+919835762937)
* **📍 Location:** Current: Udaipur, Rajasthan | Preferred: Noida, Gurugram, Delhi NCR (Priority Relocation)
* **💼 LinkedIn:** [linkedin.com/in/himanshu-srivastav-dev](https://www.linkedin.com/in/himanshu-srivastav-dev)
* **🐙 GitHub:** [github.com/Himanshu4782652](https://github.com/Himanshu4782652)
* **🌐 Portfolio:** [himanshu4782652.github.io](https://himanshu4782652.github.io)
* **📄 Web Resume:** [himanshu4782652.github.io/resume.html](https://himanshu4782652.github.io/resume.html)

---

<div align="center">
  <b>Built with ❤️ by Himanshu Srivastav</b>
</div>

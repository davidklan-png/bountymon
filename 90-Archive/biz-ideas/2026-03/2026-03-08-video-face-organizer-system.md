---
date: 2026-03-08
tags: [biz-ideas, discovery, video, face-recognition, ai, media-organization, automation]
status: discovery
---

# Video Face Recognition & Organization System

**Concept**: Automatically scan video collections, detect faces, identify actors, and organize files into folders by person name.

## Problem Statement

- Large video collections (personal, production, archival) are unorganized
- Finding videos with specific people requires manual scrubbing
- No simple tool exists to automatically sort videos by actor/face
- Professional tools (Adobe, DaVinci) are expensive and complex

## Solution Options

### Option 1: Self-Hosted Photo/Video Managers

| Software | Face Recognition | Video Support | Auto-Organize | Self-Hosted |
|----------|------------------|---------------|---------------|-------------|
| **Immich** | ✅ Excellent | ✅ Yes | ⚠️ Via search/filter | ✅ Docker |
| **digiKam** | ✅ Yes | ✅ Yes | ⚠️ Manual tagging | ✅ Desktop |
| **PhotoPrism** | ✅ Yes | ✅ Yes | ⚠️ Via search | ✅ Docker |

**Immich** is the strongest option:
- Recognizes faces in photos AND videos automatically
- Groups faces into "people" clusters
- Names can be assigned to faces
- Search/filter by person
- BUT: doesn't automatically copy/move files to folders by person

### Option 2: Professional Video Tools

| Software | Face Detection | Cost | Notes |
|----------|----------------|------|-------|
| **DaVinci Resolve Studio** | ✅ Built-in face detection | $295 | Industry standard, organizes clips by face |
| **Adobe Premiere Pro** | ✅ Sensei AI | $23/mo | Auto-tagging, searchable |
| **Adobe Elements Organizer** | ✅ Yes | $100 one-time | Consumer-friendly |

### Option 3: Cloud APIs (Celebrity Recognition)

| Service | Celebrity DB | Custom Faces | Video Support | Cost |
|---------|--------------|--------------|---------------|------|
| **Amazon Rekognition** | ✅ 100K+ celebs | ✅ Yes | ✅ Yes | Pay per use |
| **Google Cloud Vision** | ✅ Limited | ✅ Yes | ✅ Video Intelligence API | Pay per use |
| **Azure Video Indexer** | ✅ Yes | ✅ Custom models | ✅ Yes | Pay per use |
| **Clarifai** | ✅ Celebrity model | ✅ Yes | ✅ Yes | Pay per use |
| **Hive AI** | ✅ Yes | ✅ Yes | ✅ Yes | Pay per use |

### Option 4: Open Source Libraries (Build Your Own)

| Library | Language | Use Case | Difficulty |
|---------|----------|----------|------------|
| **video-to-faces** | Python | Extract faces from video, group by person | ⭐⭐ Medium |
| **face_recognition** | Python | Simple face detection/recognition | ⭐ Easy |
| **InsightFace** | Python | State-of-art face analysis | ⭐⭐⭐ Hard |
| **CompreFace** | Docker | REST API for face recognition | ⭐⭐ Medium |
| **DeepFace** | Python | Multiple models, easy to use | ⭐ Easy |

## Recommended Solution: Custom Build

**Best approach**: Combine existing open-source tools to create a system that:
1. Scans video files for faces
2. Groups faces into person clusters (or matches against known faces)
3. Copies/links videos into folders by person name

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    VIDEO ORGANIZER PIPELINE                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Video Folder]                                              │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ Frame       │───►│ Face        │───►│ Face        │     │
│  │ Extraction  │    │ Detection   │    │ Recognition │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│       │                   │                   │             │
│       │                   │                   ▼             │
│       │                   │           ┌─────────────┐      │
│       │                   │           │ Clustering  │      │
│       │                   │           │ / Matching  │      │
│       │                   │           └─────────────┘      │
│       │                   │                   │             │
│       │                   │                   ▼             │
│       │                   │           ┌─────────────┐      │
│       │                   └──────────►│ Person      │      │
│       │                               │ Assignment  │      │
│       │                               └─────────────┘      │
│       │                                       │             │
│       ▼                                       ▼             │
│  ┌─────────────┐                       ┌─────────────┐     │
│  │ Metadata    │                       │ File        │     │
│  │ Database    │                       │ Organizer   │     │
│  └─────────────┘                       └─────────────┘     │
│       │                                       │             │
│       │                                       ▼             │
│       │                               [Organized Folders]   │
│       │                                  /Person_A/         │
│       │                                  /Person_B/         │
│       │                                  /Person_C/         │
│       └─────────────────────────────────────────────────────┤
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack Recommendation

| Component | Tool | Why |
|-----------|------|-----|
| **Face Detection** | InsightFace / RetinaFace | Fast, accurate, GPU support |
| **Face Recognition** | InsightFace ArcFace | State-of-art accuracy |
| **Video Processing** | OpenCV / FFmpeg | Frame extraction |
| **Clustering** | sklearn DBSCAN | Automatic grouping |
| **Celebrity Matching** | CompreFace + custom DB | REST API, extensible |
| **File Organization** | Python shutil | Copy/hardlink files |
| **Database** | SQLite | Track faces, videos, mappings |
| **UI** (optional) | Streamlit / Gradio | Simple web interface |

### MVP Script Flow

```python
# Pseudo-code for video-organizer.py

1. Scan video folder for all video files
2. For each video:
   - Extract frames at N-second intervals
   - Detect faces in each frame
   - Generate face embeddings
   - Store: video_path, frame, face_embedding, bbox

3. Cluster all face embeddings:
   - Use DBSCAN to group similar faces
   - Each cluster = one person

4. For each cluster:
   - Find best representative face image
   - Prompt user to name the person (or match against known faces)

5. Organize files:
   - For each video, list all people detected
   - Create folders: /output/{person_name}/
   - Copy (or hardlink) video to each person's folder
   - OR: Create symlinks to avoid duplication

6. Generate report:
   - Summary: videos by person, person by video count
   - Export: JSON/CSV metadata
```

### Existing Tool: video-to-faces

**GitHub**: https://github.com/nsndp/video-to-faces

This Python library already does 80% of what's needed:
- ✅ Extracts faces from videos
- ✅ Groups faces by person automatically
- ✅ Works on live-action and anime
- ✅ GPU support
- ⚠️ Outputs face images, not organized video files

**To extend it**:
1. Use its face detection + grouping output
2. Map grouped faces back to source videos
3. Copy/organize video files into person folders

### Celebrity Recognition Option

For movies/TV shows with known actors:

| Approach | How |
|----------|-----|
| **Pre-built DB** | Download celebrity face embeddings from public datasets |
| **IMDb integration** | Match detected faces to IMDb cast list |
| **Cloud API** | Use Amazon Rekognition celebrity detection |

**Workflow**:
1. Scan video filename for movie/show title
2. Fetch cast list from IMDb/TMDB
3. Download reference images for cast
4. Match detected faces against cast references
5. Label faces with actor names

### Hard Decisions

| Decision | Options | Recommendation |
|----------|---------|----------------|
| **Copy vs Link vs Move** | Copy (safe), Hardlink (space-efficient), Symlink (fragile), Move (destructive) | Hardlink (space-efficient, files remain findable) |
| **Celebrity vs Unknown** | Pre-train on celebs, cluster unknowns, manual naming | Both: auto-match celebs, cluster+manual-name unknowns |
| **Frame sampling** | Every frame (slow, accurate), N seconds (fast, may miss) | 1 second for high-value, 5 seconds for bulk |
| **Multiple people per video** | Copy to each folder, single "primary" person, metadata only | Copy to each person's folder (video can appear in multiple) |

## Quick Start: Build It Yourself

### Minimal Python Script

```bash
# Install dependencies
pip install insightface onnxruntime opencv-python scikit-learn

# Clone helper library
git clone https://github.com/nsndp/video-to-faces.git
```

```python
# video_organizer.py (conceptual)
import cv2
import numpy as np
from insightface.app import FaceAnalysis
from sklearn.cluster import DBSCAN
import shutil
from pathlib import Path

# Initialize face analyzer
app = FaceAnalysis(name='buffalo_l')
app.prepare(ctx_id=0, det_size=(640, 640))

def extract_faces(video_path, sample_interval=30):
    """Extract face embeddings from video frames"""
    cap = cv2.VideoCapture(video_path)
    faces_data = []
    frame_idx = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_idx % sample_interval == 0:
            faces = app.get(frame)
            for face in faces:
                faces_data.append({
                    'video': video_path,
                    'frame': frame_idx,
                    'embedding': face.embedding,
                    'bbox': face.bbox
                })
        frame_idx += 1
    
    cap.release()
    return faces_data

def cluster_faces(all_faces, eps=0.5):
    """Cluster face embeddings into people"""
    embeddings = np.array([f['embedding'] for f in all_faces])
    clustering = DBSCAN(eps=eps, min_samples=2).fit(embeddings)
    
    for i, face in enumerate(all_faces):
        face['person_id'] = clustering.labels_[i]
    
    return all_faces

def organize_videos(faces_data, output_dir):
    """Copy videos to folders by person"""
    # Group videos by person
    person_videos = {}
    for face in faces_data:
        person_id = face['person_id']
        video = face['video']
        if person_id not in person_videos:
            person_videos[person_id] = set()
        person_videos[person_id].add(video)
    
    # Create folders and copy
    for person_id, videos in person_videos.items():
        person_dir = Path(output_dir) / f"person_{person_id}"
        person_dir.mkdir(exist_ok=True)
        
        for video in videos:
            shutil.copy2(video, person_dir / Path(video).name)

# Main workflow
if __name__ == "__main__":
    video_dir = "./videos"
    output_dir = "./organized"
    
    # 1. Extract all faces
    all_faces = []
    for video in Path(video_dir).glob("*.mp4"):
        all_faces.extend(extract_faces(str(video)))
    
    # 2. Cluster into people
    clustered = cluster_faces(all_faces)
    
    # 3. Organize files
    organize_videos(clustered, output_dir)
```

## Estimated Effort

| Approach | Time | Skill Level | Cost |
|----------|------|-------------|------|
| **Use Immich + manual** | 1 hour | Anyone | Free |
| **DaVinci Resolve Studio** | $295 | Intermediate | $295 |
| **Custom Python script (basic)** | 1-2 days | Developer | Free |
| **Custom script + celebrity DB** | 3-5 days | Developer | Free |
| **Full web UI + automation** | 1-2 weeks | Developer | Free |

## Business Potential

| Angle | Opportunity |
|-------|-------------|
| **Personal tool** | Self-use, open-source project |
| **SaaS** | Upload videos, auto-organize by face (privacy concerns) |
| **Desktop app** | One-time purchase tool for video editors |
| **Enterprise** | Media companies, studios, archives |
| **API service** | Video face tagging API |

## Next Steps

1. **Test video-to-faces** on sample videos to see grouping quality
2. **Decide**: Celebrity matching vs. clustering unknown faces
3. **Build MVP**: Extend video-to-faces to organize original video files
4. **Add UI**: Simple Streamlit interface for naming clusters
5. **Deploy**: Package as Docker container or desktop app

---

## Resources

- **video-to-faces**: https://github.com/nsndp/video-to-faces
- **CompreFace**: https://github.com/exadel-inc/CompreFace
- **InsightFace**: https://github.com/deepinsight/insightface
- **face_recognition (Python)**: https://github.com/ageitgey/face_recognition
- **Immich**: https://immich.app
- **digiKam**: https://www.digikam.org

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  private videoStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  videoStream$ = this.videoStreamSubject.asObservable();

  async getCameraStream(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      this.videoStreamSubject.next(stream);
      return stream;
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      this.videoStreamSubject.next(null);
      throw error;
    }
  }

  stopCameraStream(): void {
    const currentStream = this.videoStreamSubject.value;
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
      this.videoStreamSubject.next(null);
    }
  }
}

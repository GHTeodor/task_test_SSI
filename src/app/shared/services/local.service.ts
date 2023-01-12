import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  saveData(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string) {
    const data = localStorage.getItem(key);
    return (data)
      ? JSON.parse(data)
      : [];
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearData(): void {
    localStorage.clear();
  }
}

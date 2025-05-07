# Node.js API Dokümantasyon Ödevi

Bu proje, Node.js kursunun son ödevi olarak API dokümantasyonu oluşturmayı amaçlamaktadır. Swagger ve ReDocly kullanarak API belgelerinizi oluşturma ve görüntüleme işlemlerini içerir.

## Kurulum

Projeyi klonladıktan sonra gerekli bağımlılıkları yükleyin:

```bash
npm install
```

## Kullanım

### Geliştirme ortamında çalıştırma:

```bash
npm run dev
```

### Swagger belgelerini oluşturma:

```bash
npm run build-docs
```

### ReDocly önizlemesini çalıştırma:

```bash
npm run preview-docs
```

## API Dokümantasyonu

API dokümantasyonuna aşağıdaki URL'lerden erişebilirsiniz:

- Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- ReDoc: [http://localhost:3000/docs](http://localhost:3000/docs)

## Endpoint'ler

API aşağıdaki endpoint'leri içermektedir:

- `GET /contacts` - Tüm kişileri listeler
- `GET /contacts/:contactId` - Belirli bir kişiyi görüntüler
- `POST /contacts` - Yeni kişi ekler
- `PATCH /contacts/:contactId` - Kişi bilgilerini günceller
- `DELETE /contacts/:contactId` - Kişiyi siler

## Lisans

Bu proje [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html) lisansı altında lisanslanmıştır.
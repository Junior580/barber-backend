import { DiskStorageProvider } from './implementations/DiskStorageProvider'
import { S3StorageProvider } from './implementations/S3StorageProvider'

export const uploadImgProviders = {
  disk: new DiskStorageProvider(),
  ses: new S3StorageProvider(),
}

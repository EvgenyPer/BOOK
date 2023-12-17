interface BookVolume {
    kind: string;
    totalItems: number;
    items: BookItem[];
}
  
interface BookItem {
    kind: string;
    id: string;
    etag: string;
    saleInfo: saleInfo; 
    selfLink: string;
    volumeInfo: VolumeInfo;
}

interface saleInfo {
    country: string;
    isEbook: boolean;
    saleability: string;
    retailPrice: number;
}

interface VolumeInfo {
    authors: [string];
    title: string;
    averageRating: number;
    ratingsCount: number;
    description: string;
    imageLinks: {smallThumbnail: string; thumbnail: string};
}

interface Book {
    dataIndex: number;
    authors: string;
    title: string;
    averageRating: string;
    ratingsCount: number;
    description: string;
    imageLinks: string;
}
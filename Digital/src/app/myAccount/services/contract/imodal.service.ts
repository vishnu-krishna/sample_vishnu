export interface IModalService {
    activate(options: Object): Promise<boolean>;
    close(): void;
    isModalOpen: () => boolean;
}

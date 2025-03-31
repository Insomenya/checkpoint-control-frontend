import { Good } from "@/models/goods";
import { ModalOptions } from "@shared/common/organisms/AppTable";
import { ModalProps } from "@shared/common/organisms/ButtonModalBundle";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "@v-uik/base";

type Props = ModalProps<Good, ModalOptions<Good>>;

export const FakeGoodModal = ({ options, isOpen, onAccept, onReject }: Props) => {

    const handleFormSubmit = () => {
        if (options?.item) {
            onAccept?.(options?.item);
        }
    };

    return (
        <Modal onClose={onReject} open={isOpen} width={640}>
            <ModalHeader>
                {options?.item ? 'Изменение' : 'Регистрация'} ТМЦ
            </ModalHeader>
            <ModalBody>
                Тело модалки
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleFormSubmit}>{options?.item ? 'Изменить' : 'Добавить'}</Button>
            </ModalFooter>
        </Modal>
    );
};

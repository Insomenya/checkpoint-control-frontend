import { Box, Button, createUseStyles } from '@v-uik/base';
import { AppTable } from '@shared/common/organisms';
import { GoodWithDisplayUnit } from '@/models/goods';

type GoodTableItem = {
    id: number;
    name: string;
    description: string;
    unit_of_measurement_display: string;
    quantity: number;
};

const useStyles = createUseStyles((theme) => ({
    goodsList: {
        marginTop: theme.spacing(2)
    }
}));

type GoodsListProps = {
    invoiceId: number;
    invoiceGoods: Array<{ good_id: number; quantity: number }>;
    goods: GoodWithDisplayUnit[];
    onOpenAddGoodModal: (invoiceId: number) => void;
    onDeleteGood: (invoiceId: number, goodId: number) => void;
};

export const GoodsList = ({ 
    invoiceId, 
    invoiceGoods, 
    goods, 
    onOpenAddGoodModal, 
    onDeleteGood 
}: GoodsListProps) => {
    const classes = useStyles();

    // Map invoice goods to display data
    const goodsWithDetails: GoodTableItem[] = invoiceGoods.map(good => {
        const goodData = goods.find(g => g.id === good.good_id);
        return {
            id: good.good_id,
            name: goodData?.name || 'Загрузка...',
            description: goodData?.description || 'Загрузка...',
            unit_of_measurement_display: goodData?.unit_of_measurement_display || 'шт',
            quantity: good.quantity
        };
    });

    const columns = [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Название',
            width: 150,
            sortable: true
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Описание',
            sortable: true
        },
        {
            key: 'unit_of_measurement_display',
            dataIndex: 'unit_of_measurement_display',
            title: 'Единица измерения',
            width: 150,
            sortable: true
        },
        {
            key: 'quantity',
            dataIndex: 'quantity',
            title: 'Количество',
            width: 100,
            sortable: true
        }
    ];

    const handleDeleteGood = (item: GoodTableItem) => {
        onDeleteGood(invoiceId, item.id);
    };

    return (
        <Box className={classes.goodsList}>
            <Box style={{ marginBottom: '8px' }}>
                <Button 
                    kind="outlined" 
                    color="primary" 
                    size="sm"
                    onClick={() => onOpenAddGoodModal(invoiceId)}
                >
                    Добавить ТМЦ
                </Button>
            </Box>
            <AppTable
                fileName={`ТМЦ_накладной_${invoiceId}`}
                columns={columns}
                items={goodsWithDetails}
                hideDefaultFilter
                editable="d"
                onDelete={handleDeleteGood}
            />
        </Box>
    );
}; 
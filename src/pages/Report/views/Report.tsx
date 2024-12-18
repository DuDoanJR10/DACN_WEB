import { Table } from 'antd';
import { getReportProduct } from 'apis/report';
import TextDisplay from 'components/TextDisplay';
import { useEffect, useState } from 'react';
import { formatPrice } from 'utils/helpers';

const Report = () => {
  const [listReport, setListReport] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetReport();
  }, []);

  const handleGetReport = async () => {
    setLoading(true);
    try {
      const res = await getReportProduct();

      if (res.data) {
        const data = res.data.map((item: any, index: number) => ({
          ...item,
          key: index + 1,
        }));
        setListReport(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: any[] = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string) => <TextDisplay text={text} />,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string) => (
        <img
          className="max-w-[150px] max-h-[150px] object-scale-down"
          src={`${process.env.API_URL}uploads/${text}`}
          alt="thumbnail"
        />
      ),
    },
    {
      title: 'Giá nhập',
      dataIndex: 'priceOriginal',
      align: 'right',
      key: 'priceOriginal',
      render: (price: number) => <TextDisplay text={formatPrice(price, 0, ',')} />,
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      align: 'right',
      key: 'price',
      render: (price: number) => <TextDisplay text={formatPrice(price, 0, ',')} />,
    },
    {
      title: 'Tổng đá bán',
      dataIndex: 'totalSold',
      align: 'right',
      key: 'totalSold',
      render: (price: number) => <TextDisplay text={formatPrice(price, 0, ',')} />,
    },
    {
      title: 'Tổng doanh thu',
      dataIndex: 'totalRevenue',
      align: 'right',
      key: 'totalRevenue',
      render: (price: number) => <TextDisplay text={formatPrice(price, 0, ',')} />,
    },
    {
      title: 'Tổng lãi',
      dataIndex: 'totalProfit',
      align: 'right',
      key: 'totalProfit',
      render: (price: number) => <TextDisplay text={formatPrice(price, 0, ',')} />,
    },
  ];

  return (
    <div>
      <h2 className="mb-4">Báo cáo</h2>
      <Table pagination={false} columns={columns} loading={loading} dataSource={listReport} />
      <div className="flex justify-end">
        <div>
          <p className="mt-8 text-lg text-right">
            Tổng doanh thu:{' '}
            <span className="font-bold">
              {formatPrice(
                listReport.reduce((acc, item: any) => acc + item.totalRevenue, 0),
                0,
                ',',
              )}
            </span>
          </p>
          <p className="mt-2 text-lg text-right">
            Tổng lãi:{' '}
            <span className="font-bold">
              {formatPrice(
                listReport.reduce((acc, item: any) => acc + item.totalProfit, 0),
                0,
                ',',
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Report;

import React from 'react';
import style from './PageHelp.module.scss';
import clsx from 'clsx';
import { Table } from 'antd';

function PageHelp() {
  const dataSource = [
    {
      key: '1',
      name: 'Trường thông tin',
      meaning: 'Dùng để thêm trọng số của các trường đã chọn',
      vd: `Trường A có trọng số 10
      Trường B có trọng số 8
      => Trường A sẽ có độ ưu tiên cao hơn
      `,
      result:
        'Trả ra kết quả tìm kiếm cho trường có trọng số cao hơn lên trên đầu',
    },
    {
      key: '2',
      name: 'Từ đồng nghĩa',
      meaning: 'Dùng để thêm từ đồng nghĩa',
      vd: `Với từ đồng nghĩa 1 chiều: tìm kiếm từ A sẽ ra kết quả từ B
      Với từ đồng nghĩa 2 chiều: tìm kiếm từ A sẽ trả ra kết quả của từ A và B      
      `,
      result: 'Trả ra kết quả tìm kiếm theo lựa chọn 1 chiều hoặc 2 chiều',
    },
    {
      key: '3',
      name: 'Cấu hình bộ lọc',
      meaning:
        'Dùng để cấu hình sắp xếp kết quả bản ghi khi tìm kiếm theo bộ lọc',
      vd: `Cấu hình trường thông tin là giảm thì khi tìm kiếm theo bộ lọc này, các bản ghi sẽ tự động sắp xếp giảm dần      
      `,
      result:
        'Trả về kết quả tìm kiếm Mặc định/Giảm/Tăng theo lựa chọn cấu hình bộ lọc tương ứng',
    },
    {
      key: '4',
      name: 'Cấu hình kết quả tìm kiếm',
      meaning:
        'Cho phép người dùng nhập số bản ghi hiển thị trong một trang kết quả khi tìm kiếm',
      vd: `Khi tìm kiếm ra 10 bản ghi mà cấu hình kết quả mình để là 5 thì màn hình sẽ hiển thị 2 trang kết quả, mỗi trang 5 bản ghi      
      `,
      result: 'Trả về đúng số lượng bản ghi trong một trang mà được cấu hình',
    },
  ];

  const columns = [
    {
      title: 'Tên cấu hình',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 180,
    },
    {
      title: 'Ý nghĩa',
      dataIndex: 'meaning',
      key: 'meaning',
      align: 'center',
      width: 200,
    },
    {
      title: 'Ví dụ',
      dataIndex: 'vd',
      key: 'vd',
      align: 'center',
      width: 200,
    },
    {
      title: 'Kết quả đầu ra tương ứng',
      dataIndex: 'result',
      key: 'result',
      align: 'center',
      width: 200,
    },
  ];
  return (
    <div className={clsx(style.wrapPageHelp)}>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default PageHelp;

import { Button, Select, Space, Table, Input, Col } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Logo = styled.img``;

const BoardTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2cd4ac;
`;

const BoardWriteBtn = styled(Button)`
  float: right;
`;

// 게시글 갯수 : props.boards.length

export default function BoardTable(props) {
  const router = useRouter();
  const [userID, setUserID] = useState(null);
  const [hit, setHit] = useState(null);
  // console.log(props.data);
  useEffect(() => {
    if (sessionStorage.getItem('id')) {
      setUserID(sessionStorage.getItem('id'));
    } else {
      ``;
      setUserID(null);
    }
  }, [props]);

  // 게시글 삭제 함수 id : 게시글 번호
  const deleteBoard = id => {
    try {
      if (confirm('삭제하사겠습니까?')) {
        axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/community/review/${id}/`
        );
        alert('삭제 완료');
        router.replace(router.asPath);
      }
    } catch (e) {}
  };
  // 게시글 테이블 컬럼 내용
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
    },
    {
      title: '제목',
      dataIndex: 'title',
      // width: '30rem',
      render: (title, record) => (
        <a
          style={{ color: 'black', fontWeight: 'bold' }}
          href={`board/${record.id}`}
          value={record.id}
          key={record.id}
          onClick={() =>
            axios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/community/visit_count/${record.id}/`
            )
          }
        >
          {title}{' '}
          <span style={{ color: 'grey', fontSize: '5px' }}>
            [{record.comments}]
          </span>
        </a>
      ),
    },
    {
      title: '작성자',
      dataIndex: ['user', 'username2'],
    },
    {
      title: '작성일',
      dataIndex: 'created_at',
    },
    {
      title: '조회수',
      dataIndex: 'visit_count',
    },
  ];

  // 게시글 등록 창으로 이동
  const goWrite = () => {
    router.push(`board/write`);
  };

  // 게시글 검색
  const [item, setItem] = useState(null);
  const { Option } = Select;
  const handleChange = value => {
    setItem(value);
  };
  const handleChange2 = value => {
    // console.log(`selected ${value}`);
    const _data = [...props.data];
    if (value === 'comment') {
      const temp = _data.sort((a, b) => b.comments - a.comments);
      props.setData(temp);
    }
    if (value === 'visit_count') {
      const temp = _data.sort((a, b) => b.visit_count - a.visit_count);
      props.setData(temp);
    }
    if (value === 'created_at') {
      const temp = _data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      props.setData(temp);
    }
  };
  const { Search } = Input;
  const onSearch = value => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/community/review/search/${item}/${value}/`
      )
      .then(res => {
        // console.log('res.data', res.data);
        const temp = [];
        res.data.map(item => {
          temp.push({
            key: item.id,
            comments: item.comments.length,
            content: item.content,
            created_at: item.created_at,
            id: item.id,
            title: item.title,
            username2: item.user.username2,
            visit_count: item.visit_count,
            user: item.user,
          });
          // console.log('temp', temp);
        });
        props.setData(temp);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <>
      <LogoWrapper>
        <Logo src="/img/logo-colored.png" />
      </LogoWrapper>
      <BoardTitle>Review Board</BoardTitle>
      <Col
        xs={{ offset: 0 }}
        sm={{ offset: 1, span: 22 }}
        md={{ offset: 2, span: 20 }}
      >
        {userID != null ? (
          <BoardWriteBtn type="primary" onClick={goWrite}>
            게시글 쓰기
          </BoardWriteBtn>
        ) : null}
        <Select
          defaultValue="선택"
          style={{ width: 120, marginBottom: '10px' }}
          onChange={handleChange}
        >
          <Option value="title">제목</Option>
          <Option value="content">내용</Option>
          <Option value="comment">댓글</Option>
          <Option value="nickname">닉네임</Option>
        </Select>
        <Search
          placeholder="검색어를 입력해주세요"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Select
          defaultValue="정렬기준"
          style={{ width: 120 }}
          onChange={handleChange2}
        >
          <Option value="visit_count">조회수</Option>
          <Option value="comment">댓글수</Option>
          <Option value="created_at">작성일</Option>
        </Select>
        <Table
          dataSource={props.data}
          columns={columns}
          pagination={{
            position: ['bottomCenter'],
          }}
        />
      </Col>
    </>
  );
}

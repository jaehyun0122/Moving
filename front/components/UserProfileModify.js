import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Select } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import UseInput from '../hooks/useInput';
import ImageUpload from './ImageUpload';

const MyButton = styled(Button)`
  width: 150px;
  margin: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const SignupTitle = styled.h2`
  text-align: center;
  padding-bottom: 5px;
  font-weight: bold;
  color: #2cd4ac;
`;

const UserProfileModify = ({ imageUploader }) => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [category, setCategory] = useState(null);
  const [data, setData] = useState(null);
  const [category_list, setCategoryList] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username2Check, setUsername2Check] = useState(false);
  const [password, onChangePassowrd] = UseInput();
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [state, setState] = useState(false);
  const [image, setImage] = useState(null);
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeUserInfo = e => {
    setUserInfo({
      username: userInfo.username,
      username2: e.target.value,
      birthDate: userInfo.birthDate,
      gender: userInfo.gender,
    });
  };

  const children = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      children.push(
        <Select.Option key={data[i].id}>{data[i].name}</Select.Option>
      );
    }
  }
  function handleChange(value) {
    // console.log('????????? ?????? : ', value);
    const temp = [];
    value.map(item => {
      temp.push(Number(item));
    });
    // console.log('temp', temp);
    setCategoryList(temp);
    setState(true);
  }

  const nicknameCheckTrue = () => {
    alert('?????? ???????????? ????????? ?????????.');
    setUsername2Check(true);
  };

  const nicknameCheckFalse = () => {
    alert('?????? ????????? ????????? ?????????.');
    setUsername2Check(false);
    setState(true);
  };

  const handleOk = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/changepassword/${id}/`,
        {
          password: password,
        }
      )
      .then(res => {
        // console.log(res);
        setState(true);
        setIsModalVisible(false);
      })
      .catch(err => {
        console.log(err);
      });
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const changePassword = () => {
    // console.log('???????????? ?????????');
    setIsModalVisible(true);
  };

  const onSubmit = () => {
    // console.log('????????? ??????', userInfo.username2);
    // console.log('?????? ??????', category_list);
    const data = {
      username2: userInfo.username2,
      category_list: category_list,
      picture: image,
    };
    // console.log('data', data);

    axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/edit/${id}/`,
      method: 'put',
      data: data,
    })
      .then(res => {
        // console.log(res);
        alert('???????????? ?????????????????????. ????????? ???????????? ???????????????.');
        router.push('/profile');
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/genre_list/`)
      .then(res => {
        setData(res.data);
      });
  }, []);

  useEffect(() => {
    setId(sessionStorage.getItem('id'));
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/accounts/${id}`)
        .then(res => {
          setCategory(res.data.category_list);
          const temp = [];
          res.data.category_list.map(item => {
            temp.push(item.id);
            setCategoryList(temp);
          });
          setUserInfo({
            username: res.data.username,
            username2: res.data.username2,
            birthDate: res.data.birthDate,
            gender: res.data.gender,
            picture: res.data.picture,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '600px', display: 'inline-block' }}>
          {userInfo != null && category != null && (
            <div style={{ width: '100%' }}>
              <div
                style={{
                  textAlign: 'center',
                  width: '100%',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <SignupTitle>????????? ??????</SignupTitle>
                  <div>
                    <Form
                      name="basic"
                      labelCol={{
                        span: 6,
                      }}
                      wrapperCol={{
                        span: 12,
                      }}
                      autoComplete="off"
                    >
                      <ImageUpload
                        setState={setState}
                        userInfo={userInfo}
                        imageUploader={imageUploader}
                        image={image}
                        setImage={setImage}
                      />
                      <Form.Item label="?????????">
                        <span>{userInfo.username}</span>
                      </Form.Item>
                      <Form.Item label="????????????">
                        <span>
                          <a onClick={changePassword}>???????????? ????????????</a>
                        </span>
                      </Form.Item>
                      <Form.Item label="?????????">
                        <span>
                          <Input
                            style={{ width: '50%' }}
                            placeholder="???????????? ??????????????????."
                            value={userInfo.username2}
                            onChange={onChangeUserInfo}
                          />
                        </span>
                        <Button
                          onClick={() => {
                            axios
                              .post(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/isexist/`,
                                {
                                  username2: userInfo.username2,
                                }
                              )
                              .then(res => {
                                res.data
                                  ? nicknameCheckTrue()
                                  : nicknameCheckFalse();
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          }}
                        >
                          ????????????
                        </Button>
                      </Form.Item>
                      <Form.Item label="??????">
                        <span>{userInfo.gender ? '???' : '???'}</span>
                      </Form.Item>
                      <Form.Item label="????????????">
                        <span>{userInfo.birthDate}</span>
                      </Form.Item>
                      <Form.Item label="?????? ??????">
                        <Select
                          mode="multiple"
                          allowClear
                          style={{ width: '50%' }}
                          placeholder="????????? ??????????????????."
                          defaultValue={Object.values(
                            category.map(item => `${item.id}`)
                          )}
                          onChange={handleChange}
                        >
                          {children}
                        </Select>
                      </Form.Item>
                    </Form>
                  </div>
                  <div>
                    <MyButton
                      shape="round"
                      size="large"
                      onClick={() => {
                        router.back();
                      }}
                    >
                      ??????
                    </MyButton>
                    {state ? (
                      <MyButton
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={onSubmit}
                      >
                        ??????
                      </MyButton>
                    ) : (
                      <MyButton shape="round" size="large" disabled>
                        ??????
                      </MyButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <Modal
            title="???????????? ??????"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="??????"
            cancelText="??????"
          >
            <Form
              name="basic2"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 12,
              }}
              autoComplete="off"
            >
              <Form.Item label="??? ????????????" name="user-password">
                <Input.Password
                  style={{ width: '100%' }}
                  placeholder="??? ??????????????? ??????????????????."
                  value={password}
                  onChange={onChangePassowrd}
                />
              </Form.Item>
              <Form.Item label="??? ???????????? ??????" name="user-password-check">
                <Input.Password
                  style={{ width: '100%' }}
                  placeholder="??? ??????????????? ??????????????????."
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UserProfileModify;

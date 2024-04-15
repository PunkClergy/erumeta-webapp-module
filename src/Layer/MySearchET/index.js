import React, { Component } from "react";

// import '@ant-design/compatible/assets/index.css';

import { Button, Col, DatePicker, Input, Row, Select, Radio, Form } from "antd";
import PropTypes from "prop-types";
import AddressInput from "../../components/AddressInput/index";

const FormItem = Form.Item;
const { RangePicker, MonthPicker } = DatePicker;
const { Option } = Select;
export default function MySearchET(props) {
  const { searchFromData, dispatch } = props;
  const [form] = Form.useForm();
  const formatValueToRulesArr = (value) => [
    {
      required: value.rules ? value.rules[0].required : value.bol,
      message: value.rules ? value.rules[0].message : value.errorMessage,
      ...(value.rules && value.rules[0]),
    },
  ];

  const getWrapperCol = (value) => {
    if (!value || !value.labelColNum) {
      return {};
    }
    let span = 24;
    if (value.wrapperColNum) {
      span = value.wrapperColNum;
    } else if (value.labelColNum) {
      span = 23 - value.labelColNum;
    }
    return { span };
  };

  const handleSubmit = (value) => {
    props.onSubmitSearch(value, form);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSubmitReset();
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row gutter={24}>
        {searchFromData.searchData.map((value, index) => (
          <Col lg={value.lg ? value.lg : 7} md={12} sm={24} xs={24} key={index}>
            <FormItem
              label={value.title}
              labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
              wrapperCol={getWrapperCol(value)}
              name={value.name}
              rules={formatValueToRulesArr(value)}
              initialValue={value.hisDefaultValue}
            >
              {value.type === "Input" && ( // 输入框
                <Input
                  placeholder={value.placeholder}
                  style={{ width: "100%" }}
                />
              )}
              {value.type === "DatePicker" && ( // 时间选择
                <DatePicker
                  placeholder={value.placeholder}
                  style={{ width: "100%" }}
                  {...value.hisprops}
                />
              )}
              {value.type === "MonthPicker" && ( // 月份选择
                <MonthPicker
                  placeholder={value.placeholder}
                  style={{ width: "100%" }}
                />
              )}
              {value.type === "RangePicker" && ( // 时间区间选择
                <RangePicker presets={value.ranges} {...value.hisProps} />
              )}
              {value.type === "Select" && (
                <Select
                  style={{ width: "100%" }}
                  onChange={(event) =>
                    value.onChange ? value.onChange(event, form) : null
                  }
                  disabled={!!value.disabled}
                  {...value.hisProps}
                >
                  <Option value="" key="first">
                    请选择
                  </Option>
                  {value.menu &&
                    value.menu.map((singleData) => (
                      <Option
                        value={
                          singleData.childCd ||
                          singleData.delayClassId ||
                          singleData[value.menuKey]
                        }
                        key={
                          singleData.codeId ||
                          singleData[value.menuKey] ||
                          singleData.delayClassId
                        }
                      >
                        {singleData.childCodeNm ||
                          singleData.classNm ||
                          singleData[value.menuLabel]}
                      </Option>
                    ))}
                </Select>
              )}
              {value.type === "AddressInput" && (
                <AddressInput
                  addressStyle={{ width: "100%" }}
                  disabled={!!value.disabled}
                  dispatch={dispatch}
                />
              )}
              {value.type === "Radio" && (
                <Radio.Group>
                  {value.menu.map((cVal) => (
                    <Radio value={cVal.id} key={cVal.id}>
                      {cVal.name}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        ))}

        {searchFromData.checkBoxData &&
          searchFromData.checkBoxData.length !== 0 && (
            <Col lg={5} md={12} sm={24} xs={24}>
              <Form.Item initialValue={[]}>
                <Radio.Group style={{ width: "100%" }}>
                  <Row>
                    {searchFromData.checkBoxData.map((value, index) => (
                      <Col span={12} key={index}>
                        <Radio value={value.value}>{value.title}</Radio>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Col>
          )}

        <Col lg={5} md={12} sm={24} xs={24}>
          <Form.Item>
            <Button
              style={{ marginRight: "10px" }}
              htmlType="submit"
              type="primary"
            >
              查询
            </Button>
            {searchFromData.showResetButton && (
              <Button onClick={handleReset}>重置</Button>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

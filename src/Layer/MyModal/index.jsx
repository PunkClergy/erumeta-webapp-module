import React, { useEffect } from "react";
import {
  Form,
  Modal,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Radio,
  Checkbox,
  TimePicker,
  AutoComplete,
  Button,
  Switch,
  InputNumber,
  Spin,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import modalStyle from "./index.less";
import NameInput from "../../components/NameInput/index";
import AddressInput from "../../components/AddressInput/index";
import PicturesWall from "../../components/PicturesWall/index";
import { regexp } from "../../common/common";

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const CheckGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

const MyModal = (props) => {
  const { clickOk, clickCancel, cancelNoResetForm, modalData = [], zIndex, loading } = props
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [props?.title])
  const formatValueToRulesArr = (value) => {
    const rulesArray = value.rules && Array.isArray(value.rules) && value.rules.length > 0 ? value.rules : [];
    const firstRule = rulesArray[0] || {};
    const required = firstRule.required || value.bol;
    const message = firstRule.message || value.errorMessage;
    const ruleObject = {
      required,
      message,
      ...firstRule,
    };
    return [ruleObject];
  };

  const getFieldsData = (valueData) => {
    const { form, dispatch } = props;
    const children = [];

    valueData.forEach((value) => {
      switch (value.type) {
        case "hidden":
          // 隐藏
          break;
        case "upload":
          children.push(
            <Col span={24} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue || ""}
                rules={{ ...formatValueToRulesArr(value) }}
              >
                <Upload className="myUpload" listType="picture-card" {...value.hisProps}>
                  <div>
                    {value.loading && <LoadingOutlined />}
                    {value.loading && <PlusOutlined />}
                    <div className="ant-upload-text">Upload</div>
                  </div>
                </Upload>
              </FormItem>
            </Col>
          );
          break;
        case "labelContent":
          // 标签
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>{value.content}</FormItem>
            </Col>
          );
          break;
        case "numberInput":
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue}
                rules={{ ...formatValueToRulesArr(value) }}
              >
                <InputNumber style={{ width: "100%" }} {...value.hisProps} />
              </FormItem>
            </Col>
          );
          break;
        case "switch":
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue === undefined ? true : value.hisDefaultValue}
              >
                <Switch
                  checkedChildren={value.checkText || "是"}
                  unCheckedChildren={value.unCheckText || "否"}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case "leftRight":
          // 左右文字
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                name={value.keyName}
                rules={{ ...formatValueToRulesArr(value) }}
                initialValue={{ ...value.hisDefaultValue || "" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{value.leftText}</p>
                  <p>{value.rightText}</p>
                </div>

              </FormItem>
            </Col>
          );
          break;
        case "autoComplete":
          // 自动补全
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}
                initialValue={value.hisDefaultValue || ""}
              >
                <AutoComplete
                  style={{ width: "100%" }}
                  dataSource={value.menu || []}
                  placeholder={value.placeholder}
                  filterOption={value.filterOption}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case "select":
          // 复选框
          children.push(
            <Col span={12} key={value.key} style={{ display: value.hidden ? "none" : "block" }}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue || ""}
                rules={[
                  {
                    required: value.rules ? value.rules[0].required : value.bol,
                    message: value.rules ? value.rules[0].message : value.errorMessage,
                    ...(value.rules && value.rules[0]),
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={(event) => (value.onChange ? value.onChange(event, form) : null)}
                  disabled={!!value.disabled}
                >
                  <Option value="" key="first">
                    请选择
                  </Option>
                  {value.menu.map((singleData) => (
                    <Option
                      value={singleData.childCd || singleData[value.menuKey]}
                      key={singleData.codeId || singleData[value.menuKey]}
                    >
                      {singleData.childCodeNm || singleData[value.menuLabel]}
                    </Option>
                  ))}
                </Select>
                {value.hasButton && <Button onClick={value.buttonClick}>{value.buttonText}</Button>}
              </FormItem>
            </Col>
          );
          break;
        case "textArea":
          // 文本域
          children.push(
            <Col span={12} key={value.key} style={{ display: value.hidden ? "none" : "block" }}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue || ""}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}
              >
                <TextArea
                  autosize={{ minRows: 3 }}
                  placeholder={value.placeholder}
                  disabled={!!value.disabled}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case "datePicker":
          // 日期选择器
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue || ""}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}
              >
                <DatePicker
                  style={{ width: "100%" }} // 當value.unDisabledDate为true时候就不做限制
                  disabledDate={(currentDate) => !value.unDisabledDate && currentDate < moment()}
                  disabled={!!value.disabled}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case "radioGroup":
          // 单选按钮组
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue || ""}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}
              >
                <RadioGroup
                  style={{ width: "100%" }}
                  onChange={(event) => value.onChange && value.onChange(event, form)}
                  disabled={!!value.disabled}
                  {...value.hisProps}
                >
                  {value.menu.map((singleData) => (
                    <Radio
                      value={singleData.childCd || singleData[value.menuKey]}
                      key={singleData.codeId || singleData[value.menuKey]}
                    >
                      {singleData.childCodeNm || singleData[value.menuLabel]}
                    </Radio>
                  ))}
                </RadioGroup>

              </FormItem>
            </Col>
          );
          break;
        case "checkGroup":
          // 复选按钮组
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue || ""}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}>
                <CheckGroup
                  style={{ width: "100%" }}
                  options={value.menu}
                  disabled={!!value.disabled}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case "nameInput":
          // 英文名字
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={{
                  family: value.englishName ? value.englishName.lastName : "",
                  name: value.englishName ? value.englishName.firstName : "",
                }}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}>
                <NameInput placeholder={value.placeholder} disabled={!!value.disabled} style={{ width: "100%" }} />
              </FormItem>
            </Col>
          );
          break;
        case "addressInput":
          // 地址复选框
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue || []}
                rules={value.rules}
              >
                <AddressInput addressStyle={{ width: "100%" }} disabled={!!value.disabled} dispatch={dispatch} />
              </FormItem>
            </Col>
          );
          break;
        case "gender":
          // 性别
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue ? value.hisDefaultValue : "F"}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}
              >

                <RadioGroup>
                  <Radio value="F" key="F">
                    女
                  </Radio>
                  <Radio value="M" key="M">
                    男
                  </Radio>
                </RadioGroup>

              </FormItem>
            </Col>
          );
          break;
        case "content":
          // 文本
          children.push(
            <Col span={24} key={value.key}>
              <FormItem label={value.labelName}>{value.content}</FormItem>
            </Col>
          );
          break;
        case "delete":
          // 删除
          children.push(
            <Col span={12} key={value.key}>
              <FormItem label={value.labelName}>
                <p>你确定要删除吗？</p>
              </FormItem>
            </Col>
          );
          break;
        case "timeRangePicker":
          // 时间范围选择器
          children.push(
            <Col key={value.key} span={12}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}
              >
                <TimePicker style={{ width: "100%" }} disabled={!!value.disabled} {...value.hisProps} />
              </FormItem>
            </Col>
          );
          break;
        case "rangePicker":
          // 日期范围选择器
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}
              >
                <RangePicker style={{ width: "100%" }} disabled={!!value.disabled} />
              </FormItem>
            </Col>
          );
          break;
        case "pictureWall":
          children.push(
            <Col span={12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                initialValue={value.hisDefaultValue}
                rules={[{
                  ...formatValueToRulesArr(value)
                }]}
              >
                <PicturesWall
                  style={{ width: "100%" }}
                  pictureLength={value.pictureLength || 1}
                  disabled={!!value.disabled}
                />
              </FormItem>
            </Col>
          );
          break;
        default:
          // 默认的input
          children.push(
            <Col span={value.colSpan || 12} key={value.key} style={{ display: value.hidden ? "none" : "block" }}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  pattern: value.patternType ? regexp[`${value.patternType}`] : "",
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue}
              >

                <Input
                  autoComplete={value.inputType === "password" ? "new-password" : "off"}
                  type={value.inputType || "text"}
                  onBlur={value.onBlur}
                  placeholder={value.placeholder}
                  disabled={!!value.disabled}
                  readOnly={!!value.readOnly}
                  addonAfter={value.addonAfter || ""}
                  {...value.hisProps}
                />

              </FormItem>
            </Col>
          );
          break;
      }
    });
    return children;
  };
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields()
      clickOk(values);
    } catch (errorInfo) {
      console.log(errorInfo)
    }
  };
  const handleCancel = (e) => {
    if (cancelNoResetForm) {
      form.validateFields()
      return;
    }
    form.resetFields();
    clickCancel(false, e);
  };

  return (
    <Modal
      {...props}
      destroyOnClose
      maskClosable={false}
      className={modalStyle?.antProbablyStudentModal}
      open={props.open}
      onOk={handleModalOk}
      onCancel={handleCancel}
      zIndex={zIndex || 1000}
    >
      {loading && (
        <div className="mySpin">
          <Spin />
        </div>
      )}
      <div style={{ position: "relative" }}>
        <Form
          layout={props.layout}
          form={form}
        >
          <Row gutter={24}>
            {getFieldsData(modalData)}
          </Row>
        </Form>
      </div>
    </Modal>
  );

}

export default MyModal;

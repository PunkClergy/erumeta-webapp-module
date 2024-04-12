import React, { PureComponent } from 'react';
// import { Form } from '@ant-design/compatible';

// import '@ant-design/compatible/assets/index.css';


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
  Slider,
  Switch,
  InputNumber,
  Spin,
} from 'antd';
import modalStyle from './index.less';
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

const MyModalTwo = (props) => {
  const { cancelNoResetForm, clickCancel, clickOk } = props
  const [form] = Form.useForm()
  const formatValueToRulesArr = value => [
    {
      required: value.rules ? value.rules[0].required : value.bol,
      message: value.rules ? value.rules[0].message : value.errorMessage,
      ...(value.rules && value.rules[0]),
    },
  ];

  const getFieldsData = valueData => {
    const { dispatch: outerDispatch } = props;
    const children = [];
    const currentStudyYearId = localStorage.getItem('eduTouch_year_id')
      ? localStorage.getItem('eduTouch_year_id')
      : '';
    valueData.forEach(value => {
      switch (value.type) {
        case 'hidden':
          // 隐藏
          break;
        case 'justTitle':
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              {value.titleContent}
            </Col>
          );
          break;
        case 'switch':
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                initialValue={value.hisDefaultValue ? true : false}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                valuePropName='checked'
              >
                <Switch
                  onChange={event => value.onChange && value.onChange(event, form)}
                  checkedChildren={value.checkText || '是'}
                  unCheckedChildren={value.unCheckText || '否'}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case 'labelContent':
          // 标签
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                className={value.haveSpace ? '' : 'itemNoSpace'}
                label={value.labelName}
                name={value.keyName}
              >
                {value.content}
              </FormItem>
            </Col>
          );
          break;
        case 'leftRight':
          // 左右文字
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p>{value.leftText}</p>
                  <p>{value.rightText}</p>
                </div>
              </FormItem>
            </Col>
          );
          break;
        case 'slider':
          children.push(
            <Col span={value.colSpan || 28} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue || 0}
              >
                <Slider step={null} marks={value.marks} {...value.hisProps} />
              </FormItem>
            </Col>
          );
          return;
        case 'autoComplete':
          // 自动补全
          children.push(
            <Col span={value.colSpan || 28} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue || ''}
              >
                <AutoComplete
                  style={{ width: '100%' }}
                  dataSource={value.menu || []}
                  placeholder={value.placeholder}
                  filterOption={value.filterOption}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case 'multipleSelect':
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.menu.length > 0 ? value.hisDefaultValue || [] : []}
              >
                <Select
                  mode={value.modeType || 'multiple'}
                  style={{ width: '100%' }}
                  disabled={!!value.disabled}
                  placeholder={value.placeholder || '请输入'}
                  {...value.hisProps}
                >
                  {value.menu.map(singleData => (
                    <Option
                      value={singleData.childCd || singleData[value.menuKey]}
                      key={singleData.codeId || singleData[value.menuKey]}
                    >
                      {singleData.childCodeNm || singleData[value.menuLabel]}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          );
          break;
        case 'select':
          // 复选框
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.menu.length > 0 ? value.hisDefaultValue || '' : ''}
              >

                <Select
                  style={{ width: '100%' }}
                  onChange={event => (value.onChange ? value.onChange(event, form) : null)}
                  disabled={!!value.disabled}
                  {...value.hisProps}
                >
                  <Option value="" key="first">
                    请选择
                  </Option>
                  {value.menu.map(singleData => (
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
        case 'textArea':
          // 文本域
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue}
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
        case 'datePicker':
          // 日期选择器
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue}
              >

                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={
                    value.disabledDate
                      ? currentDate => value.disabledDate(currentDate)
                      : () => false
                  }
                  disabled={!!value.disabled}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case 'radioGroup':
          // 单选按钮组
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue ? value.hisDefaultValue : ''}
              >

                <RadioGroup
                  style={{ width: '100%' }}
                  onChange={event => (value.onChange ? value.onChange(event, form) : null)}
                  disabled={!!value.disabled}
                >
                  {value.menu.map(singleData => (
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
        case 'checkGroup':
          // 复选按钮组
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue}
              >

                <CheckGroup
                  style={{ width: '100%' }}
                  options={value.menu}
                  disabled={!!value.disabled}
                  {...value.hisProps}
                />

              </FormItem>
            </Col>
          );
          break;
        case 'nameInput':
          // 英文名字
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[
                  {
                    required: value.rules ? value.rules[0].required : value.bol,
                    message: value.rules ? value.rules[0].message : value.errorMessage,
                    ...(value.rules && value.rules[0]),
                  },
                ]}
                initialValue={{
                  family: value.englishName ? value.englishName.lastName : '',
                  name: value.englishName ? value.englishName.firstName : '',
                }}
              >

                <NameInput disabled={!!value.disabled} style={{ width: '100%' }} />
              </FormItem>
            </Col>
          );
          break;
        case 'addressInput':
          // 地址复选框
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue || []}
              >
                <AddressInput
                  addressStyle={{ width: '100%' }}
                  disabled={!!value.disabled}
                  dispatch={outerDispatch}
                />
              </FormItem>
            </Col>
          );
          break;
        case 'gender':
          // 性别
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue ? value.hisDefaultValue : 'F'}
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
        case 'isTrue':
          // 是否
          console.log(value.hisDefaultValue, '====value.hisDefaultValue')
          children.push(
            <Col span={value.colSpan || 16} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue ? true : (value.hisDefaultValue === undefined ? true : false)}
              >
                <RadioGroup>
                  <Radio value={true} key="true">
                    是
                  </Radio>
                  <Radio value={false} key="false">
                    否
                  </Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          );
          break;
        case 'content':
          // 文本
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
              >
                {value.content}
              </FormItem>
            </Col>
          );
          break;
        case 'delete':
          // 删除
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
              >
                <p>你确定要删除吗？</p>
              </FormItem>
            </Col>
          );
          break;
        case 'timeRangePicker':
          // 时间范围选择器
          children.push(
            <Col key={value.key} span={value.colSpan || 12}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue || null}
              >

                <TimePicker
                  onChange={event => (value.onChange ? value.onChange(form, event) : null)}
                  disabled={!!value.disabled}
                  {...value.hisProps}
                />

              </FormItem>
            </Col>
          );
          break;
        case 'rangePicker':
          // 日期范围选择器
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue}
              >
                <RangePicker
                  disabledDate={value.disabledDate}
                  style={{ width: '100%' }}
                  disabled={!!value.disabled}
                  {...value.hisProps}
                />
              </FormItem>
            </Col>
          );
          break;
        case 'pictureWall':
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue}
              >
                <PicturesWall
                  style={{ width: '100%' }}
                  pictureLength={value.pictureLength || 1}
                  disabled={!!value.disabled}
                />
              </FormItem>
            </Col>
          );
          break;
        case 'show':
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
              >
                {value.textContent}
              </FormItem>
            </Col>
          );
          break;
        case 'studyYear':
          children.push(
            <Col key={value.key} span={value.colSpan || 12}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  pattern: value.patternType ? regexp[`${value.patternType}`] : '',
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.menu.length > 0 ? currentStudyYearId : ''}
              >
                <Select
                  style={{ width: '100%' }}
                  onChange={event => (value.onChange ? value.onChange(form, event) : null)}
                  {...value.hisProps}
                >
                  {value.menu.map(single => (
                    <Option value={String(single.acadYearId)} key={single.acadYearId}>
                      {single.acadTitle}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          );
          break;
        case 'numberInput':
          children.push(
            <Col span={value.colSpan || 12} key={value.key}>
              <FormItem
                label={value.labelName}
                name={value.keyName}
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                rules={[{ ...formatValueToRulesArr(value) }]}
                initialValue={value.hisDefaultValue}
              >
                <InputNumber
                  style={{ width: value.afterText ? value.afterTextWidth || '80%' : '100%' }}
                  onChange={event => value.onChange && value.onChange(event, form)}
                  disabled={!!value.disabled}
                  placeholder={value.placeholder}
                  {...value.hisProps}
                  precision={value.precision}
                />
                {value.afterText && <span style={{ marginLeft: '10px' }}>{value.afterText}</span>}
              </FormItem>
            </Col>
          );
          break;
        default:
          // 默认的input
          children.push(
            <Col
              span={value.colSpan || 12}
              key={value.key}
              style={{ display: value.hidden ? 'none' : 'block' }}
            >
              <FormItem
                labelCol={value.labelColNum ? { span: value.labelColNum } : {}}
                label={value.labelName}
                name={value.keyName}
                rules={[{
                  required: value.rules ? value.rules[0].required : value.bol,
                  message: value.rules ? value.rules[0].message : value.errorMessage,
                  pattern: value.patternType ? regexp[`${value.patternType}`] : '',
                  ...(value.rules && value.rules[0]),
                }]}
                initialValue={value.hisDefaultValue}
              >
                <Input
                  type={value.inputType || 'text'}
                  onBlur={value.onBlur}
                  placeholder={value.placeholder}
                  disabled={!!value.disabled}
                  readOnly={!!value.readOnly}
                  maxLength={value.maxlength}
                  addonAfter={value.addonAfter || ''}
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
      clickOk(values);
      form.resetFields();
    } catch (errorInfo) {
      console.log(errorInfo)
    }

  };


  const handleCancel = e => {

    if (cancelNoResetForm) {
      form.validateFields()
      return;
    }
    form.resetFields();
    clickCancel(false, e);
  };



  const {
    modalData = [],
    otherData = f => f,
    zIndex,
    labelCol,
    footer,
    loading,
  } = props;
  const myFooter = footer ? { footer: footer(form) } : {};
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      className={modalStyle.antProbablyStudentModal}
      onOk={handleModalOk}
      onCancel={handleCancel}
      zIndex={zIndex || 1000}
      {...props}
      {...myFooter}

    >
      {loading && (
        <Spin

        />
      )}
      <div id="dialogmodal" style={{ position: 'relatvie' }}>
        {otherData()}
        <Form layout={props.layout || 'vertical'} form={form}>
          <Row gutter={24}>
            {getFieldsData(modalData, labelCol)}
          </Row>
        </Form>
      </div>
    </Modal>
  );
}

export default MyModalTwo;

import React, { PureComponent } from "react";
import {
  Table,
  Col,
  Select,
  Row,
  Input,
  Button,
  DatePicker,
  Card,
  Radio,
  Form,
} from "antd";
// import styles from "../../public/css/TableListTwo.less";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;

const MyTable = (props) => {
  const [form] = Form.useForm();
  const {
    headerMenuData,
    headerOther,
    noTable = false,
    cardStyle,
    bordered,
    hisCardProps = {},
    hisTableProps = {},
    hiddenButton = false,
    onSelect,
    intl,
  } = props;
  const getCurrentFormValue = () => {
    return form.getFieldsValue();
  };

  const myHandleSearch = (value) => {
    const { handleSearch } = props;
    handleSearch(value, form);
  };

  const myHandleFormReset = () => {
    const { handleSearch, resetButtonFunc } = props;
    if (resetButtonFunc) {
      resetButtonFunc(form);
      return;
    }
    console.log(123123131);
    form.resetFields(); // 重置表单
    form.scrollToField();
  };

  const renderHeader = (menuData, hidenButton) => {
    const currentStudyYearId = localStorage.getItem("eduTouch_year_id")
      ? Number(localStorage.getItem("eduTouch_year_id"))
      : "";
    if (!menuData) {
      return <div />;
    }
    const childrenData = [];
    menuData.forEach((singleMenu) => {
      switch (singleMenu.type) {
        case "hidden":
          // 隐藏
          break;
        case "studyYear":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem
                label={singleMenu.labelName}
                name={singleMenu.keyName}
                initialValue={
                  singleMenu.menu.length > 0 ? currentStudyYearId : ""
                }
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={
                    singleMenu.onChange && singleMenu.onChange.bind(form)
                  }
                >
                  {singleMenu.menu.map((single) => (
                    <Option value={single.acadYearId} key={single.acadYearId}>
                      {single.acadTitle}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          );
          break;
        case "select":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem
                label={singleMenu.labelName}
                name={singleMenu.keyName}
                initialValue={
                  singleMenu.menu.length > 0
                    ? singleMenu.hisDefaultValue || ""
                    : ""
                }
              >
                <Select
                  style={{ width: "100%" }}
                  onChange={singleMenu.onChange}
                >
                  <Option value="" key="first">
                    请选择
                  </Option>
                  {singleMenu.menu.map((single) => (
                    <Option
                      value={single.childCd}
                      key={single.codeId || single.key}
                    >
                      {single.childCodeNm}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          );
          break;
        case "datePicker":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem
                label={singleMenu.labelName}
                name={singleMenu.keyName}
                initialValue={singleMenu.hisDefaultValue}
              >
                <DatePicker format={singleMenu.dateFormat || "YYYY-MM-DD"} />
              </FormItem>
            </Col>
          );
          break;
        case "monthPicker":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem
                label={singleMenu.labelName}
                name={singleMenu.keyName}
                initialValue={singleMenu.hisDefaultValue}
              >
                <MonthPicker
                  disabledDate={singleMenu.disabledDate || (() => false)}
                  format={singleMenu.dateFormat || "YYYY-MM"}
                />
              </FormItem>
            </Col>
          );
          break;
        case "doubleDatePicker":
          childrenData.push(
            <Col
              lg={6}
              md={8}
              sm={24}
              xs={24}
              key={singleMenu.key}
              initialValue=""
            >
              <FormItem label={singleMenu.labelName} name={singleMenu.keyName}>
                <RangePicker
                  ranges={singleMenu.ranges || ""}
                  style={{ width: "100%" }}
                />
              </FormItem>
            </Col>
          );
          break;
        case "Button":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <span
              // className={styles.submitButtons}
              >
                <Button
                  type={singleMenu.buttonType}
                  htmlType={singleMenu.htmlType}
                >
                  {singleMenu.ButtonName}
                </Button>
              </span>
            </Col>
          );
          break;
        case "radionButtonGroup":
          childrenData.push(
            <Col lg={24} md={24} sm={24} xs={24} key={singleMenu.key}>
              <FormItem
                label={singleMenu.labelName}
                style={{ marginBottom: "2px" }}
                initialValue=""
                name={singleMenu.keyName}
              >
                <Radio.Group
                  key={singleMenu.key}
                  size={singleMenu.size || "default"}
                  onChange={handleSizeChange}
                >
                  {singleMenu.menu.map((item) => (
                    <Radio.Button key={item.key}>{item.title}</Radio.Button>
                  ))}
                </Radio.Group>
              </FormItem>
            </Col>
          );
          break;
        case "selectInput":
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem
                label={singleMenu.labelName}
                style={{ marginBottom: "2px" }}
                name={singleMenu.keyName}
                initialValue=""
              >
                <div style={{ display: "flex" }}>
                  <Select defaultValue="lucy" style={{ width: 100 }}>
                    <Option value="jack">家长信息</Option>
                    <Option value="lucy">孩子姓名</Option>
                  </Select>
                  <Input
                    name={singleMenu.keyName}
                    placeholder={singleMenu.placeholder}
                  />
                </div>
              </FormItem>
            </Col>
          );
          break;
        case "multiple":
          childrenData.push(
            <Col
              lg={singleMenu.widthCol ? singleMenu.widthCol : 6}
              md={8}
              sm={24}
              xs={24}
              key={singleMenu.key}
            >
              <FormItem
                label={singleMenu.labelName}
                initialValue={[]}
                name={singleMenu.keyName}
              >
                <Select
                  mode={singleMenu.modeType ? singleMenu.modeType : "multiple"}
                  placeholder={singleMenu.placeholder}
                  notFoundContent={null}
                  filterOption={!singleMenu.openFilterOption}
                  onChange={singleMenu.onChange}
                  onSearch={singleMenu.onSearch}
                  onBlur={singleMenu.onBlur}
                  style={{ width: "100%" }}
                >
                  {singleMenu.menu.map((value) => (
                    <Option
                      value={value[singleMenu.childKey]}
                      key={value[singleMenu.childKey]}
                      info={value}
                    >
                      {value[singleMenu.childName]}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
          );
          break;
        default:
          childrenData.push(
            <Col lg={6} md={8} sm={24} xs={24} key={singleMenu.key}>
              <FormItem
                label={singleMenu.labelName}
                name={singleMenu.keyName}
                initialValue=""
              >
                <Input placeholder={singleMenu.placeholder} />
              </FormItem>
            </Col>
          );
          break;
      }
    });

    childrenData.push(
      !hidenButton ? (
        <Col
          md={3}
          sm={24}
          xs={24}
          key="submiType"
          className={
            childrenData.length <= 2
              ? "twoChildren"
              : childrenData.length === 4
                ? "onlyOneBtn"
                : "newButton"
          }
        >
          <span
          // className={styles.submitButtons}
          >
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: "app.button.query" })}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={myHandleFormReset}>
              {intl.formatMessage({ id: "app.button.reset" })}
            </Button>
          </span>
        </Col>
      ) : (
        <div key="lastBtn" />
      )
    );

    return (
      <div
      // className={styles.tableList}
      >
        <div
        // className={styles.tableListForm}
        >
          <Form onFinish={myHandleSearch} className="myForm" form={form}>
            <Row gutter={24}>{childrenData}</Row>
          </Form>
        </div>
      </div>
    );
  };
  return (
    <Card style={{ cardStyle }} bordered={bordered} {...hisCardProps}>
      <Form>
        {headerMenuData ? renderHeader(headerMenuData, hiddenButton) : ""}
      </Form>
      {headerOther ? (
        <div style={{ margin: "10px 0 20px 0" }}>{headerOther()}</div>
      ) : (
        ""
      )}
      {!noTable && [
        <Table
          key="myTable"
          {...props}
          {...hisTableProps}
          style={{ marginTop: headerOther ? "" : "10px" }}
        />,
      ]}
    </Card>
  );
};

export default MyTable;

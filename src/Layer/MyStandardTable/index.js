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
// import styles from "../../style/TableList.less";



const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;

export default function MyTable(props) {
  const { headerMenuData, headerOther, noTable = false, cardStyle } = props;
  const [form] = Form.useForm();
  const getCurrentFormValue = () => {
    return form.getFieldsValue();
  };

  const myHandleSearch = (value) => {
    const { handleSearch } = props;
    handleSearch(value);
  };

  const myHandleFormReset = () => {
    const { handleSearch, resetButtonFunc } = props;
    if (resetButtonFunc) {
      resetButtonFunc(form);
      return;
    }
    form.resetFields(); // 重置表单
    form.scrollToField((fieldsValue) => {
      handleSearch(fieldsValue);
    });
  };

  const renderHeader = (menuData) => {
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
                  <Input name={singleMenu.keyName} placeholder={singleMenu.placeholder} />
                </div>
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
      <Col
        md={3}
        sm={24}
        xs={24}
        key="submiType"
        className={
          childrenData.length <= 3
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
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={myHandleFormReset}>
            重置
          </Button>
        </span>
      </Col>
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
    <Card style={{ cardStyle }}>
      {headerMenuData ? renderHeader(headerMenuData) : ""}
      {headerOther ? (
        <div style={{ margin: "10px 0 20px 0" }}>{headerOther()}</div>
      ) : (
        ""
      )}
      {!noTable && [
        <Table
          key="myTable"
          {...props}
          style={{ marginTop: headerOther ? "" : "10px" }}
        />,
      ]}
    </Card>
  );
};

// export default MyTable;

import React, { useState } from "react";
import BackwordIcon from "../assets/left.png";

const SideBar = ({ onClosePage }) => {
  const [values, setValues] = useState({
    segment_name: "",
    schema: [{}],
  });

  const options = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const handleOnchange = (e, index) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    console.log(selectedOption, "sele");
    setValues((prev) => {
      const updatedSchema = [...prev.schema];
      updatedSchema[index] = { [selectedOption.value]: selectedOption.label };
      return { ...prev, schema: updatedSchema };
    });
  };

  const handleRemoveSchema = (index) => {
    
    setValues((prev) => {
      const updatedSchema = prev.schema.filter((_, i) => i !== index); 
      return { ...prev, schema: updatedSchema };
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://your-api-endpoint.com/save-segment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved successfully:", result);
        // Clear form or show a success message
        setValues({
          segment_name: "",
          schema: [{}],
        });
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="sidebar-card">
      <div className="sidebar-head">
        <div onClick={onClosePage}>
          <img
            height={20}
            width={20}
            className="back-ico"
            src={BackwordIcon}
            alt="back"
          />
        </div>

        <span>Saving Segment</span>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-bcard">
          <div></div>
          <label className="mrg-btm abel-text">
            Enter the name of the segment
          </label>
          <input
            className="mrg-btm input-pad"
            onChange={(e) => {
              setValues((prev) => ({ ...prev, segment_name: e.target.value }));
            }}
            value={values.segment_name}
            placeholder="Name of the segment"
          />
          <div className="mrg-btm label-text">
            To save your segment, you need to add the schemas to build the query
          </div>
          <div className="d-flex justify-content-end mrg-btm">
            <div className="user-text">
              <span className="user-green user-group"></span>
              <span className="text">- User Track</span>
            </div>
            <div className="user-text">
              <span className="group-red user-group"></span>
              <span className="text">- Group Track</span>
            </div>
          </div>
          {values.schema.map((value, index) => {
            return (
              <>
                <div className="mrg-btm select-page" key={index}>
                  <select
                    className="select-pad"
                    value={Object.keys(value)[0] || ""}
                    onChange={(e) => handleOnchange(e, index)}
                  >
                    <option value={value}>Add shema to segment</option>
                    {options.map((item, i) => (
                      <option key={i} value={item?.value}>
                        {item?.label}
                      </option>
                    ))}
                  </select>
                  {index != 0 && (
                    <div onClick={()=>{handleRemoveSchema(index)}} className="select-close">
                      <span>-</span>
                    </div>
                  )}
                </div>
              </>
            );
          })}

          <a
            href="#"
            onClick={() => {
              setValues((prev) => ({
                ...prev,
                schema: [...prev.schema, {}],
              }));
            }}
          >
            + Add New Schema
          </a>
        </div>
        <div className="footer">
          <button className="btn-save" onClick={handleSave}>
            Save the segment
          </button>
          <button
            className="btn-cancel"
            onClick={() => {
              setValues({
                segment_name: "",
                schema: [{}],
              });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

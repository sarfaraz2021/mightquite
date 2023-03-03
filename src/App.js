import React from "react";
import { useState, useEffect } from "react";
import Records from "./records.json";

export default function App() {
  const [basic_salary_female, setBasic_salary_female] = useState(0);
  const [basic_salary_male, setBasic_salary_male] = useState(0);
  const [overtime_male, setOvertime_male] = useState(0);
  const [overtime_female, setOvertime_female] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [total, setTotal] = useState(0);

  // var basic_salary_female = 0;
  // var basic_salary_male = 0;
  // var overtime_male = 0;
  // var overtime_female = 0;
  useEffect(() => {
    var basic_salary_female = 0;
    var basic_salary_male = 0;
    var overtime_male = 0;
    var overtime_female = 0;
    var bonus = 0;
    Records.forEach((record) => {
      var date = record.date;
      const month = date.split(" ");
      // console.log(month);
      if (month[0] === "Feb") {
        if (record.weekday === 1 || record.weekday === 7) {
          if (record.designation === "Worker") {
            console.log(
              "-------------------------------------------------------------"
            );
            if (record.gender === "Male") {
              let per_hour = record.per_day_salary / 8;
              // console.log("checkkkkkkkkkkkkk", per_hour);
              overtime_male =
                overtime_male + 2 * (record.total_hours * per_hour);
            } else if (record.gender === "Female") {
              let per_hour = record.per_day_salary / 8;
              overtime_female =
                overtime_female + 2 * (record.total_hours * per_hour);
            }
          }
        } else if (
          record.weekday === 2 ||
          record.weekday === 3 ||
          record.weekday === 4 ||
          record.weekday === 5 ||
          record.weekday === 6
        ) {
          if (record.designation === "Worker") {
            if (record.total_hours >= 8) {
              if (record.gender === "Male") {
                let per_hour = record.per_day_salary / 8;
                let m = record.total_hours - 8;
                overtime_male = overtime_male + 2 * m * per_hour;
                basic_salary_male = basic_salary_male + record.per_day_salary;
              } else if (record.gender === "Female") {
                let per_hour = record.per_day_salary / 8;
                let m = record.total_hours - 8;
                overtime_female = overtime_female + 2 * m * per_hour;
                basic_salary_female =
                  basic_salary_female + record.per_day_salary;
              }
            } else if (record.total_hours < 8 && record.total_hours >= 4) {
              if (record.gender === "Male") {
                basic_salary_male =
                  basic_salary_male + record.per_day_salary / 2;
              } else if (record.gender === "Female") {
                basic_salary_female =
                  basic_salary_female + record.per_day_salary / 2;
              }
            }
          } else {
            if (record.total_hours >= 8) {
              if (record.gender === "Male") {
                basic_salary_male = basic_salary_male + record.per_day_salary;
              } else if (record.gender === "Female") {
                basic_salary_female =
                  basic_salary_female + record.per_day_salary;
              }
            } else if (record.total_hours < 8 && record.total_hours >= 4) {
              if (record.gender === "Male") {
                basic_salary_male =
                  basic_salary_male + record.per_day_salary / 2;
              } else if (record.gender === "Female") {
                basic_salary_female =
                  basic_salary_female + record.per_day_salary / 2;
              }
              //basic_salary=basic_salary+(record.per_day_salary/2)
            }
          }
        }
      }
    });
    if (
      basic_salary_female + overtime_female >
      basic_salary_male + overtime_male
    ) {
      let total = basic_salary_male + overtime_male;
      bonus = total / 100;
      setBonus(bonus);
    } else if (
      basic_salary_male + overtime_male >
      basic_salary_female + overtime_female
    ) {
      let total = basic_salary_female + overtime_female;
      bonus = total / 100;
      setBonus(bonus);
    }
    setBasic_salary_female(basic_salary_female);
    setBasic_salary_male(basic_salary_male);
    setOvertime_male(overtime_male);
    setOvertime_female(overtime_female);
    setTotal(
      basic_salary_female +
        basic_salary_male +
        overtime_male +
        overtime_female +
        bonus
    );
  }, []);

  return (
    <div>
      {basic_salary_female + basic_salary_male}{" "}
      {overtime_female + overtime_male} {bonus} {""}
      {total}
    </div>
  );
}

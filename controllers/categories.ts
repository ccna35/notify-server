import { Request, Response } from "express";
import { connection } from "../db/db";
import { UserRequest } from "../util/token";
import { ResultSetHeader } from "mysql2";

const createCategory = (req: UserRequest, res: Response) => {
  console.log(req.user);

  const user_id = req.user;

  const { category_name } = req.body;

  const category_details = [[user_id, category_name]];

  const checkQuery =
    "SELECT * FROM categories WHERE category_name = ? AND user_id = ?";

  connection.query<ResultSetHeader[]>(
    checkQuery,
    [category_name, user_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }

      if (results.length > 0) {
        res.status(400).send("This category already exists");
      } else {
        const query = "INSERT INTO categories(user_id, category_name) VALUES ?";

        connection.query(query, [category_details], (err, results, fields) => {
          if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
          } else {
            console.log("results", results);
            res.status(200).send("Category was created successfully");
          }
        });
      }
    }
  );
};

// const updateNote = (req, res) => {
//   const companyId = req.params.id;
//   const {
//     company_name,
//     company_logo,
//     company_cover_photo,
//     overview,
//     industry,
//     country,
//     city,
//     state,
//     zip_code,
//     website,
//     founded_year,
//     company_size,
//     contact_email,
//     contact_phone,
//     revenue,
//   } = req.body;

//   const query =
//     "UPDATE companies SET company_name = ?, company_logo = ?, company_cover_photo = ?, overview = ?, industry = ?, country = ?, city = ?, state = ?, zip_code = ?, website = ?, founded_year = ?, company_size = ?, contact_email = ?, contact_phone = ?, revenue = ? WHERE id = ?";

//   const newData = [
//     company_name,
//     company_logo,
//     company_cover_photo,
//     overview,
//     industry,
//     country,
//     city,
//     state,
//     zip_code,
//     website,
//     founded_year,
//     company_size,
//     contact_email,
//     contact_phone,
//     revenue,
//     companyId,
//   ];

//   connection.query(query, newData, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     } else if (result.affectedRows === 0) {
//       res.status(404).send("Company not found");
//     } else {
//       res.status(200).send("Company updated successfully");
//     }
//   });
// };

// const deleteNote = (req, res) => {
//   const companyId = req.params.id;

//   const query = "DELETE FROM companies WHERE id = ?";
//   connection.query(query, companyId, (err, result) => {
//     if (err) {
//       res.status(500).send("Internal Server Error");
//     } else if (result.affectedRows === 0) {
//       res.status(404).send("Company not found");
//     } else {
//       res.status(200).send("Company deleted successfully");
//     }
//   });
// };

const getAllCategories = (req: UserRequest, res: Response) => {
  const user = req.user;

  console.log(user);

  const user_id = [[user]];

  const query = "SELECT * FROM `categories` WHERE user_id = ?";

  connection.query(query, [user_id], (err, results) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(results);
    }
  });
};

export { createCategory, getAllCategories };

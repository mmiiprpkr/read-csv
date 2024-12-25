import fs from "fs";
import csv from "csv-parser";

interface ICompany {
   companyNameTh: string;
   companyNameEn: string;
   description: string | null;
   other_description: string | null;
   location: string | null;
   province: string | null;
   subdistrict: string | null;
   contractName: string | null;
   contractTel: string | null;
   contractEmail: string | null;
   contractSocial: string | null;
   establishment: string | null;
   website: string | null;
   position: string | null;
   benefit: string | null;
   occupation: string | null;
   imgLink: string | null;
   isMou: boolean;
}

async function readCSV(): Promise<ICompany[]> {
   return new Promise((resolve, reject) => {
      const companies: ICompany[] = [];
      fs.createReadStream("data.csv", { encoding: "utf-8" })
         .pipe(csv())
         .on("data", (row) => {
            companies.push({
               companyNameEn: row["ชื่อสถานประกอบการ(ภาษาอังกฤษ)"],
               companyNameTh: row["ชื่อสถานประกอบการ(ภาษาไทย)"],
               description: row["รายละเอียดเพิ่มเติม"],
               other_description: row["รายละเอียดเพิ่มเติม"],
               location: row["ที่ตั้ง"],
               province: row["จังหวัด"],
               subdistrict: null,
               contractName: row["ช่องทางการติดต่อ"],
               contractTel: row["เบอร์โทร"],
               contractEmail: row["อีเมล"],
               contractSocial: row["Social Media"],
               establishment: row["สายการเรียน"],
               website: row["website"],
               position: row["ตำแหน่งที่ฝึก"],
               benefit: row["Benefit"],
               occupation: row["ประเภทของสถานประกอบการ"],
               imgLink: row["link ภาพ"],
               isMou: row["ความร่วมมือ"] === "MOU",
            });
         })
         .on("end", () => {
            resolve(companies);
         })
         .on("error", (error) => {
            reject(error);
         });
   });
}

(async function main() {
   try {
      const companies = await readCSV();
      console.log(companies);
      console.log("length", companies.length);
   } catch (error) {
      console.error("Error reading CSV:", error);
   }
})();

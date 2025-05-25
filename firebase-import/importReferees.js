const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const referees = [];

fs.createReadStream("referees.csv")
  .pipe(csv())
  .on("data", (row) => {
    const name = `${row.Firstname?.trim() || ""} ${row.Lastname?.trim() || ""}`.trim();
    if (!name) {
      console.warn("Skipping row with missing name:", row);
      return;
    }

    referees.push({
      name,
      foil: row.Foil?.trim() || "",
      epee: row.Epee?.trim() || "",
      sabre: row.Sabre?.trim() || "",
      city: row.City?.trim() || "",
      secretariat: row["Sec."]?.trim() || "",
      armoury: row["Arm."]?.trim() || ""
    });
  })
  .on("end", async () => {
    console.log(`Uploading ${referees.length} referees to Firestore...`);

    for (const ref of referees) {
      if (!ref.name || typeof ref.name !== "string" || !ref.name.trim()) {
        console.warn("Skipping invalid document ID:", ref);
        continue;
      }

      const cleanName = ref.name.trim();
      await db.collection("referees").doc(cleanName).set(ref);
    }

    console.log("Upload complete.");
  });

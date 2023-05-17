import productSeeder from "./productSeeder";
import clinicSeeder from "./clinicSeeder";
import roleSeeder from "./roleSeeder";
import userSeeder from "./userSeeder";

async function main() {
  try {
    await productSeeder;
    await clinicSeeder;
    await roleSeeder;
    await userSeeder;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();

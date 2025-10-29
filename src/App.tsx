import type { Component } from "solid-js";
import { createSignal, createEffect, Suspense } from "solid-js";
import { useLocation, Route, Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { Toaster } from "solid-toast";

// start import page components
import Landing from './views/pages/front_page/Landing';
import Login from './views/pages/auth/Login';
import DashboardUser from "./views/pages/dashboard/DashBoardUser";

import ContactReferenceElectronicMailTypeIndex from "./views/pages/contact/reference/electronic_mail_type/Index";
import ContactReferencePhoneTypeIndex from "./views/pages/contact/reference/phone_type/Index";
import ContactReferenceResidenceTypeIndex from "./views/pages/contact/reference/residence_type/Index";
import ContactReferenceWebsiteTypeIndex from "./views/pages/contact/reference/website_type/Index";
import InstitutionMasterEmployeeIndex from "./views/pages/institution/master/employee/Index";
import InstitutionMasterInstitutionIndex from "./views/pages/institution/master/institution/Index";
import InstitutionMasterInstutionShow from "./views/pages/institution/master/institution/Show";
import InstitutionReferenceCategoryIndex from "./views/pages/institution/reference/category/Index";
import InstitutionReferenceVarietyIndex from "./views/pages/institution/reference/variety/Index";
import LocationProvinceIndex from "./views/pages/location/province/Index";
import LocationRegencyIndex from "./views/pages/location/regency/Index";
import LocationRegencyTypeIndex from "./views/pages/location/regency_type/Index";
import LocationSubDistrictIndex from "./views/pages/location/sub_district/Index";
import LocationVillageIndex from "./views/pages/location/village/Index";
import PersonMasterIndividualIndex from "./views/pages/person/master/individual/Index";
import PersonMasterIndividualShow from "./views/pages/person/master/individual/Show";
import PersonReferenceGenderIndex from "./views/pages/person/reference/gender/Index";
import PersonReferenceIdentificationTypeIndex from "./views/pages/person/reference/identification_type/Index";
import PersonReferenceMaritalStatusIndex from "./views/pages/person/reference/marital_status/Index";
import PersonReferenceOccupation from "./views/pages/person/reference/occupation/Index";
import PersonReferenceReligionIndex from "./views/pages/person/reference/religion/Index";
// end import page components

// Create a separate component for the routes that can use router hooks
const RootLayout = (props: { children: any }) => {
  const location = useLocation();
  const [_, setLoc] = createSignal(location.pathname);

  createEffect(() => {
    setLoc(location.pathname);
    // if (window.HSStaticMethods) {
    //   window.HSStaticMethods.autoInit();
    // }
    if (typeof window !== "undefined" && window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
      const backdrop = document.querySelector(
        "#hs-offcanvas-right-backdrop",
      ) as HTMLElement | null;
      if (backdrop) {
        backdrop.remove();
      }
      // const styles = document.body.getElementsByTagName("style");
      // if (styles.length > 0) {
      //   console.log("Body has a <style> element.");
      // }
      if (document.body.hasAttribute("style")) {
        document.body.removeAttribute("style");
      }
    }
  });

  return (
    <MetaProvider>
      <Toaster position="top-left" gutter={8} />
      <main class="w-full h-full">
        <Suspense>{props.children}</Suspense>
      </main>
    </MetaProvider>
  );
};

const App: Component = () => {
  return (
    <>
      <Router root={(props) => <RootLayout>{props.children}</RootLayout>}>
        <Route
          path="/auth/login"
          component={Login}
        />
        <Route
          path="/contact/reference/electronic_mail_type"
          component={ContactReferenceElectronicMailTypeIndex}
        />
        <Route
          path="/contact/reference/phone_type"
          component={ContactReferencePhoneTypeIndex}
        />
        <Route
          path="/contact/reference/residence_type"
          component={ContactReferenceResidenceTypeIndex}
        />
        <Route
          path="/contact/reference/website_type"
          component={ContactReferenceWebsiteTypeIndex}
        />
        <Route
          path="/dashboard"
          component={DashboardUser}
        />
        <Route
          path="/institution/master/employee"
          component={InstitutionMasterEmployeeIndex}
        />
        <Route
          path="/institution/master/institution/show"
          component={InstitutionMasterInstutionShow}
        />
        <Route
          path="/institution/master/institution"
          component={InstitutionMasterInstitutionIndex}
        />
        <Route
          path="/institution/reference/category"
          component={InstitutionReferenceCategoryIndex}
        />
        <Route
          path="/institution/reference/variety"
          component={InstitutionReferenceVarietyIndex}
        />
        <Route
          path="/location/province"
          component={LocationProvinceIndex}
        />
        <Route
          path="/location/regency"
          component={LocationRegencyIndex}
        />
        <Route
          path="/location/regency_type"
          component={LocationRegencyTypeIndex}
        />
        <Route
          path="/location/sub_district"
          component={LocationSubDistrictIndex}
        />
        <Route
          path="/location/village"
          component={LocationVillageIndex}
        />
        <Route
          path="/person/master/individual/Show"
          component={PersonMasterIndividualShow}
        />
        <Route
          path="/person/master/individual"
          component={PersonMasterIndividualIndex}
        />
        <Route
          path="/person/reference/gender"
          component={PersonReferenceGenderIndex}
        />
        <Route
          path="/person/reference/identification_type"
          component={PersonReferenceIdentificationTypeIndex}
        />
        <Route
          path="/person/reference/marital_status"
          component={PersonReferenceMaritalStatusIndex}
        />
        <Route
          path="/person/reference/occupation"
          component={PersonReferenceOccupation}
        />
        <Route
          path="/person/reference/religion"
          component={PersonReferenceReligionIndex}
        />
        <Route
          path="/"
          component={Landing}
        />
      </Router>
    </>
  );
};

export default App;

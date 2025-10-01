export async function loadLayoutMiddleware(route) {
    try {
        let layout = route.meta.layout || "DefaultLayout";

        let layoutComponent = await import(`../../layouts/${layout}.vue`);
        route.meta.layoutComponent = layoutComponent.default;
    } catch (e) {
        console.error("Error occurred in processing of layouts: ", e);
        console.log("Mounted DefaultLayout");
        let layout = "DefaultLayout";
        let layoutComponent = await import(`../../layouts/${layout}.vue`);
        route.meta.layoutComponent = layoutComponent.default;
    }
}
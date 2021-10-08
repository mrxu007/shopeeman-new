export default class viewManagerService {
    nativeService = window["ViewManagerBridgeService"];
    openUrlTab(name, url) {
        return this.nativeService.openUrlTab(name, url);
    }
    restUrlTab(name, url) {
        console.log(this.nativeService)
        if (this.nativeService.restUrlTab) {
            return this.nativeService.restUrlTab(name, url);
        }
    }

}

npCmsApp.controller('PartnerViewController',['$scope', function($scope){
    var partnerViewScope = this;

    partnerViewScope.dateToday = new Date();
    partnerViewScope.fromDate = new Date();
    partnerViewScope.startDateToday =  new Date(partnerViewScope.dateToday.getFullYear(),
                                                partnerViewScope.dateToday.getMonth(),
                                                partnerViewScope.dateToday.getDay(), 0, 0, 0, 0);
    partnerViewScope.fromTime = partnerViewScope.startDateToday;
    partnerViewScope.toDate = new Date();
    partnerViewScope.toTime = new Date(partnerViewScope.dateToday.getFullYear(),
                                        partnerViewScope.dateToday.getMonth(),
                                        partnerViewScope.dateToday.getDay(),
                                        partnerViewScope.dateToday.getHours(),
                                        partnerViewScope.dateToday.getMinutes(), 0, 0);
    partnerViewScope.partnerList = [{
        name: 'Roadrunnr',
        code: 'Roadrunnr'
    }];
    partnerViewScope.selectedPartner = { name: 'Roadrunnr', code: 'Roadrunnr'};
    partnerViewScope.selectedOutcome = {};
    partnerViewScope.selectedOutcome = 'success';

    L.mapbox.accessToken = 'pk.eyJ1IjoibmF2YW5lZXQiLCJhIjoiY2lqY3RrNm5wMDAybHR3a2tyZWlxNTk5ZCJ9.I0eajOrY9z5-plnBxMVnrw';
    map = L.mapbox.map('map').setView([21.0000, 78.0000], 5).addLayer(L.mapbox.tileLayer('mapbox.streets'));
    agentMarkersLayer = new L.MarkerClusterGroup({
        maxClusterRadius: 120,
        iconCreateFunction: function(cluster)
        {
            var childCount = cluster.getChildCount();
            return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster agent_marker-cluster', iconSize: new L.Point(40, 40) });
        }
    });
    inquiriesMarkersLayer = new L.MarkerClusterGroup({
        iconCreateFunction: function(cluster)
        {
            var childCount = cluster.getChildCount();
            return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster inquiries_marker-cluster', iconSize: new L.Point(40, 40) });
        }
    });

}]);

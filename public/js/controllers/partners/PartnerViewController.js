npCmsApp.controller('PartnerViewController', ['$scope', 'ResourceFactory', function ($scope, ResourceFactory) {
    var partnerViewScope = this;

    partnerViewScope.filterForm = {};
    partnerViewScope.dateToday = new Date();
    partnerViewScope.filterForm.fromDate = new Date();
    partnerViewScope.startDateToday = new Date(partnerViewScope.dateToday.getFullYear(),
        partnerViewScope.dateToday.getMonth(),
        partnerViewScope.dateToday.getDate(), 00, 00, 0, 0);
    partnerViewScope.filterForm.fromTime = partnerViewScope.startDateToday;
    partnerViewScope.filterForm.toDate = new Date();
    partnerViewScope.filterForm.toTime = new Date(partnerViewScope.dateToday.getFullYear(),
        partnerViewScope.dateToday.getMonth(),
        partnerViewScope.dateToday.getDate(),
        partnerViewScope.dateToday.getHours(),
        partnerViewScope.dateToday.getMinutes(), 0, 0);
    partnerViewScope.partnerList = [{
        name: 'Roadrunnr',
        code: 'ROADRUNNR'
    }];
    partnerViewScope.filterForm.selectedPartner = {name: 'Roadrunnr', code: 'ROADRUNNR'};
    partnerViewScope.filterForm.selectedOutcome = {};
    partnerViewScope.filterForm.selectedOutcome = 'success';

    ResourceFactory.Agents.View.get(function (response) {
        createMap();
        drawAgentsMarker(response);
    }, function (error) {

    });

    function createMap() {
        L.mapbox.accessToken = 'pk.eyJ1IjoibmF2YW5lZXQiLCJhIjoiY2lqY3RrNm5wMDAybHR3a2tyZWlxNTk5ZCJ9.I0eajOrY9z5-plnBxMVnrw';
        map = L.mapbox.map('map').setView([21.0000, 78.0000], 5).addLayer(L.mapbox.tileLayer('mapbox.streets'));
        agentMarkersLayer = new L.MarkerClusterGroup({
            maxClusterRadius: 120,
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();
                return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster agent_marker-cluster',
                    iconSize: new L.Point(40, 40)
                });
            }
        });
        inquiriesMarkersLayer = new L.MarkerClusterGroup({
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();
                return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster inquiries_marker-cluster',
                    iconSize: new L.Point(40, 40)
                });
            }
        });
    }

    function drawAgentsMarker(response) {
        agentMarkersLayer.clearLayers();
        var hitsArray = response.hits.hits;
        for (var i = 0; i < hitsArray.length; i++) {
            var shopLocation = hitsArray[i]._source.shopLocation;
            var myTitle = "Retailer Name: <b>" + hitsArray[i]._source.shopName + "</b><br>";
            myTitle += "Mobile: <b>" + hitsArray[i]._source.mobileNo + "</b><br>";
            myTitle += "Balance: <b>&#8377;" + hitsArray[i]._source.walletBalance + "</b><br>";
            var xy = shopLocation.split(",");
            var latlng = L.latLng(Number(xy[0]), Number(xy[1]));

            var marker = L.marker((latlng), {
                icon: L.mapbox.marker.icon({
                    'marker-symbol': 'building',
                    'marker-size': 'large',
                    'marker-color': '#0097c6'
                }),
                source: hitsArray[i]._source
            });
            marker.bindPopup(myTitle);
            agentMarkersLayer.addLayer(marker);
        }
        map.addLayer(agentMarkersLayer);
    }

    partnerViewScope.agentLayer = true;

    partnerViewScope.agentOnClick = function () {
        if (map.hasLayer(agentMarkersLayer)) {
            map.removeLayer(agentMarkersLayer);
            partnerViewScope.agentLayer = false;
        } else {
            map.addLayer(agentMarkersLayer);
            partnerViewScope.agentLayer = true;
        }
    };

    function resetAgentMarkersColor() {
        if (agentMarkersLayer) {
            agentMarkersLayer.eachLayer(function (layer) {
                layer.setIcon(L.mapbox.marker.icon({
                    'marker-symbol': 'building',
                    'marker-size': 'large',
                    'marker-color': '#0097c6'
                }));//blue
            });
        }
    }


    partnerViewScope.inquiriesLayer = true;

    partnerViewScope.inquiriesOnClick = function () {
        if (map.hasLayer(inquiriesMarkersLayer)) {
            map.removeLayer(inquiriesMarkersLayer);
            partnerViewScope.inquiriesLayer = false;
        } else {
            map.addLayer(inquiriesMarkersLayer);
            partnerViewScope.inquiriesLayer = true;
        }
    };

    function drawInquiriesMarker(response) {
        inquiriesMarkersLayer.clearLayers();
        var hitsArray = response.hits.hits;
        var totalAmount = 0;
        for (var i = 0; i < hitsArray.length; i++) {
            var requestedLocation = hitsArray[i]._source.requestedLocation;

            var myTitle = "Requested Amount: <b>&#8377;" + hitsArray[i]._source.requestedAmount + "</b><br>";
            var requestedTimestamp = hitsArray[i]._source.timestamp;
            var requestedDate = new Date(requestedTimestamp);
            var formattedDate = requestedDate.getHours() + ":" + requestedDate.getMinutes() + ":" +
                requestedDate.getSeconds() + " " + requestedDate.getDate() + "-" + requestedDate.getMonth() +
                "-" + requestedDate.getFullYear();
            myTitle += "Requested Time: <b>" + formattedDate + "</b><br>";
            myTitle += "Requested Radius: <b>" + hitsArray[i]._source.requestedRadius + "m</b><br>";

            var xy = requestedLocation.split(",");
            var latlng = L.latLng(Number(xy[0]), Number(xy[1]));
            var reasonforfailure = hitsArray[i]._source.reasonforfailure;
            if (reasonforfailure == "NO_AGENT_FOUND") {
                colorCode = '#ff0000';//red
            } else if (reasonforfailure == "INSUFFICIENT_BALANCE") {
                colorCode = '#FFCC00';//orange
            } else {
                colorCode = '#26D826';//green
            }
            var marker = L.marker((latlng), {
                icon: L.mapbox.marker.icon({
                    'marker-symbol': 'scooter',
                    'marker-size': 'large',
                    'marker-color': colorCode
                }),
                source: hitsArray[i]._source
            });
            marker.bindPopup(myTitle);
            inquiriesMarkersLayer.addLayer(marker);
            totalAmount = totalAmount + hitsArray[i]._source.requestedAmount;
        }


        inquiriesMarkersLayer.on('click', function (e) {
            highlightAgentMarkers(e.layer.options.source);
            var latlng = e.latlng;
            var radius = e.layer.options.source.requestedRadius;
            if (!circle) {
                circle = L.circle(latlng, radius).addTo(map);
            } else {
                circle.setLatLng(latlng);
                circle.setRadius(radius);
            }
        });

        map.addLayer(inquiriesMarkersLayer);
        partnerViewScope.inquiries.totalAmount = totalAmount;
    }

    partnerViewScope.applyFilter = function () {
        partnerViewScope.filterForm.fromDateStr = (partnerViewScope.filterForm.fromDate).getFullYear() + '/' +
            (((partnerViewScope.filterForm.fromDate).getMonth()) + 1) + '/' +
            (partnerViewScope.filterForm.fromDate).getDate() + ' ' +
            (partnerViewScope.filterForm.fromTime).getHours() + ':' +
            (partnerViewScope.filterForm.fromTime).getMinutes();

        partnerViewScope.filterForm.toDateStr = (partnerViewScope.filterForm.toDate).getFullYear() + '/' +
            (((partnerViewScope.filterForm.toDate).getMonth()) + 1) + '/' +
            (partnerViewScope.filterForm.toDate).getDate() + ' ' +
            (partnerViewScope.filterForm.toTime).getHours() + ':' +
            (partnerViewScope.filterForm.toTime).getMinutes();
        ResourceFactory.Agents.Filter.save(partnerViewScope.filterForm, function (response) {
            partnerViewScope.inquiries = {};
            partnerViewScope.inquiries.count = response.hits.total;
            resetAgentMarkersColor();
            drawInquiriesMarker(response);
            partnerViewScope.showInquiries = true;
        }, function (error) {

        });

    };

}]);

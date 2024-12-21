(() => {
var exports = {};
exports.id = 549;
exports.ids = [549];
exports.modules = {

/***/ 5253:
/***/ ((module) => {

// Exports
module.exports = {
	"section": "MeetUp-details_section__Oeb6s"
};


/***/ }),

/***/ 2155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SlugPage),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./components/meetups/MeetUp-details.module.css
var MeetUp_details_module = __webpack_require__(5253);
var MeetUp_details_module_default = /*#__PURE__*/__webpack_require__.n(MeetUp_details_module);
;// CONCATENATED MODULE: ./components/meetups/meetUp-details.js


function MeetUpDetails({ image , title , address , description  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: (MeetUp_details_module_default()).section,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                src: image,
                alt: title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                children: title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("address", {
                children: address
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: description
            })
        ]
    });
}

// EXTERNAL MODULE: external "mongodb"
var external_mongodb_ = __webpack_require__(8013);
;// CONCATENATED MODULE: ./pages/[meetupId]/index.js



function SlugPage({ meetUpData  }) {
    if (!meetUpData) {
        return /*#__PURE__*/ jsx_runtime_.jsx("p", {
            children: "Loading..."
        }); // Show a loading state while fallback generates the page
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(MeetUpDetails, {
        image: meetUpData.image,
        title: meetUpData.title,
        address: meetUpData.address,
        description: meetUpData.description
    });
}
async function getStaticPaths() {
    const client = await external_mongodb_.MongoClient.connect(// `mongodb+srv://rajib506:9832487950@cluster0.y1zod.mongodb.net/meetups`
    process.env.MONGODB_URI);
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const findMeetupData = await meetupCollection.find({}, {
        _id: 1
    }).toArray();
    console.log("Meetup IDs:", findMeetupData); // Log the data for debugging
    client.close();
    return {
        fallback: true,
        paths: findMeetupData.map((meetup)=>({
                params: {
                    meetupId: meetup._id.toString()
                }
            }))
    };
}
async function getStaticProps(context) {
    const { params  } = context;
    const meetUpId = params.meetupId;
    const client = await external_mongodb_.MongoClient.connect(// `mongodb+srv://rajib506:9832487950@cluster0.y1zod.mongodb.net/meetups`
    process.env.MONGODB_URI);
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    let selctedMeetupData;
    try {
        selctedMeetupData = await meetupCollection.findOne({
            _id: new external_mongodb_.ObjectId(meetUpId)
        });
    } catch (error) {
        console.error("Error fetching meetup data:", error);
        return {
            notFound: true
        }; // Return a 404 page for invalid `meetupId`
    }
    client.close();
    if (!selctedMeetupData) {
        return {
            notFound: true
        }; // Return 404 if no data is found
    }
    return {
        props: {
            meetUpData: {
                id: selctedMeetupData._id.toString(),
                title: selctedMeetupData.title,
                image: selctedMeetupData.image,
                address: selctedMeetupData.address,
                description: selctedMeetupData.description
            }
        },
        revalidate: 1
    };
}


/***/ }),

/***/ 8013:
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2155));
module.exports = __webpack_exports__;

})();
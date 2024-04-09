package com.react_native_push_notification.calendar
import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = "CalendarModule")
class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CalendarModule"
    }

    private var listenerCount = 0
    @ReactMethod
    fun createCalendarEvent(name: String, location: String, callback: Callback) {
        Log.d("CalendarModule", "Create event called with name: $name and location: $location")
        callback.invoke("Data is passed from the native modules")
    }

    @ReactMethod
    fun createCalendarEventPromise(promise: Promise){
        try{
            promise.resolve("Promise is resolved successfully");
            sendEvent(reactApplicationContext, "EventCount", listenerCount );
            listenerCount = listenerCount + 1;
       } catch (error: Exception){
            promise.reject("Rejected from the native module");
        }
    }

    private fun sendEvent(reactContext: ReactContext, eventName: String, params: Int){
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }
}
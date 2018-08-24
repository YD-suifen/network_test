package main

import (
	"fmt"
	"net"
	"net/http"
	"strings"

	"html/template"

	"github.com/syohex/go-ipinfo"
)

var mytemp *template.Template

type INfojsontmp struct {
	IP           net.IP
	HostName     string
	City         string
	Region       string
	Country      string
	Location     string
	Organization string
}

func Ip(w http.ResponseWriter, r *http.Request) {

	ipport := r.RemoteAddr

	ip := strings.Split(ipport, ":")
	infojson := Ipinfo(ip[0])

	tmp1 := template.Must(template.ParseFiles("first.html"))
	jsontype := INfojsontmp{
		IP:           infojson.IP,
		HostName:     infojson.HostName,
		City:         infojson.City,
		Region:       infojson.Region,
		Location:     infojson.Location,
		Organization: infojson.Organization,
	}
	fmt.Println(jsontype.IP, jsontype.Country)
	tmp1.Execute(w, jsontype)

}

func Ipinfo(ip string) *ipinfo.Info {
	info := ipinfo.IPInfo(net.ParseIP(ip))

	return info

}

func main() {

	http.HandleFunc("/ip", Ip)
	http.ListenAndServe(":8080", nil)

}

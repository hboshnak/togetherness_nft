import AssocList "mo:base/AssocList";
import List "mo:base/List";

actor {

  // whoami
  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };

  public query func lookup(name : Name) : async ?Entry {
    return AssocList.find(contacts, name, nameEq);
  };
};